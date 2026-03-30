import { Component } from "@theme/component";

/**
 * A custom element that displays the wishlist count in a bubble.
 * Updates when the wishlist changes.
 */
class WishlistBubble extends HTMLElement {
  /** @type {MutationObserver | undefined} */
  observer;

  /** @type {number} */
  _lastCount = 0;

  connectedCallback() {
    document.addEventListener("flamma:wishlist:updated", this.update);
    this.update();

    this.observer = new MutationObserver(() => {
      this.observer?.disconnect();
      this.update();
      this.startObserving();
    });
    this.startObserving();
  }

  startObserving() {
    if (this.observer) {
      this.observer.observe(this, {
        childList: true,
        characterData: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["class", "style"],
      });
    }
  }

  disconnectedCallback() {
    document.removeEventListener("flamma:wishlist:updated", this.update);
    this.observer?.disconnect();
  }

  /**
   * Updates the wishlist bubble display.
   */
  update = () => {
    const wishlist = /** @type {string[]} */ (
      JSON.parse(localStorage.getItem("flamma-wishlist-v1") || "[]")
    );
    const newCount = wishlist.length;

    this.textContent = String(newCount);

    if (newCount > 0) {
      this.style.display = "flex";
      this.classList.remove("is-hidden");
    } else {
      this.style.display = "none";
      this.classList.add("is-hidden");
    }

    if (typeof this._lastCount !== "undefined") {
      if (newCount !== this._lastCount && newCount > 0) {
        this.classList.remove("wishlist-bubble--animating");
        void this.offsetWidth;
        this.classList.add("wishlist-bubble--animating");
      }
    }
    this._lastCount = newCount;
  };
}

if (!customElements.get("wishlist-bubble")) {
  customElements.define("wishlist-bubble", WishlistBubble);
}

/**
 * A custom element that displays a filled or empty icon based on wishlist state.
 */
class WishlistHeaderIcon extends HTMLElement {
  /** @type {MutationObserver | undefined} */
  observer;

  connectedCallback() {
    document.addEventListener("flamma:wishlist:updated", this.update);
    this.update();

    this.observer = new MutationObserver(() => {
      this.observer?.disconnect();
      this.update();
      this.startObserving();
    });
    this.startObserving();
  }

  startObserving() {
    if (this.observer) {
      this.observer.observe(this, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style"],
      });
    }
  }

  disconnectedCallback() {
    document.removeEventListener("flamma:wishlist:updated", this.update);
    this.observer?.disconnect();
  }

  /**
   * Updates the icon display based on wishlist state.
   */
  update = () => {
    const wishlist = /** @type {string[]} */ (
      JSON.parse(localStorage.getItem("flamma-wishlist-v1") || "[]")
    );
    const isLiked = wishlist.length > 0;

    const emptyIcon = /** @type {HTMLElement | null} */ (
      this.querySelector(".wishlist-icon--empty")
    );
    const filledIcon = /** @type {HTMLElement | null} */ (
      this.querySelector(".wishlist-icon--filled")
    );

    if (emptyIcon) emptyIcon.style.display = isLiked ? "none" : "";
    if (filledIcon) filledIcon.style.display = isLiked ? "" : "none";
  };
}

if (!customElements.get("wishlist-header-icon")) {
  customElements.define("wishlist-header-icon", WishlistHeaderIcon);
}

/**
 * A custom element that toggles a product's wishlist status.
 *
 * @typedef {object} WishlistButtonRefs
 * @property {HTMLElement} [wishlistIcon] - The wishlist icon container
 *
 * @extends {Component<WishlistButtonRefs>}
 */
class WishlistButton extends Component {
  /** @type {string | undefined} */
  productId;

  connectedCallback() {
    super.connectedCallback();
    this.productId = this.dataset.productId;
    this.updateIcon();
    document.addEventListener("flamma:wishlist:updated", this.updateIcon);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener("flamma:wishlist:updated", this.updateIcon);
  }

  /**
   * Toggles the wishlist status of the product.
   * @param {Event} [event]
   */
  toggle = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!this.productId) return;

    // Visual animation only
    this.classList.add("is-animating");
    setTimeout(() => this.classList.remove("is-animating"), 300);

    let wishlist = /** @type {string[]} */ (
      JSON.parse(localStorage.getItem("flamma-wishlist-v1") || "[]")
    );
    const index = wishlist.indexOf(this.productId);

    if (index > -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(this.productId);
    }

    localStorage.setItem("flamma-wishlist-v1", JSON.stringify(wishlist));
    document.dispatchEvent(new CustomEvent("flamma:wishlist:updated"));
  };

  /**
   * Updates the icon based on current wishlist state.
   */
  updateIcon = () => {
    if (!this.productId) return;
    const wishlist = /** @type {string[]} */ (
      JSON.parse(localStorage.getItem("flamma-wishlist-v1") || "[]")
    );
    const isLiked = wishlist.includes(this.productId);

    const emptyIcon = /** @type {HTMLElement | null} */ (
      this.querySelector(".wishlist-icon--empty")
    );
    const filledIcon = /** @type {HTMLElement | null} */ (
      this.querySelector(".wishlist-icon--filled")
    );

    if (emptyIcon) emptyIcon.style.display = isLiked ? "none" : "";
    if (filledIcon) filledIcon.style.display = isLiked ? "" : "none";
  };
}

if (!customElements.get("wishlist-button")) {
  customElements.define("wishlist-button", WishlistButton);
}

/**
 * A custom element that displays the wishlist section on a dedicated page.
 */
class WishlistSection extends HTMLElement {
  /** @type {HTMLElement | null} */
  container;

  /** @type {HTMLElement | null} */
  emptyState;

  connectedCallback() {
    this.container = this.querySelector('[ref="container"]');
    this.emptyState = this.querySelector('[ref="emptyState"]');

    document.addEventListener("flamma:wishlist:updated", this.loadWishlist);
    this.loadWishlist();
  }

  disconnectedCallback() {
    document.removeEventListener("flamma:wishlist:updated", this.loadWishlist);
  }

  /**
   * Loads and displays the wishlist items.
   */
  loadWishlist = () => {
    const wishlist = /** @type {string[]} */ (
      JSON.parse(localStorage.getItem("flamma-wishlist-v1") || "[]")
    );

    if (wishlist.length === 0) {
      if (this.container) this.container.style.display = "none";
      if (this.emptyState) this.emptyState.style.display = "flex";
      return;
    }

    if (this.emptyState) this.emptyState.style.display = "none";
    if (this.container) {
      this.container.style.display = "block";
      this.fetchProducts(wishlist);
    }
  };

  /**
   * Fetches and renders the wishlist products.
   * @param {string[]} ids - Array of product IDs to fetch
   */
  fetchProducts = async (ids) => {
    const searchQuery = ids.map((id) => `id:${id}`).join(" OR ");
    const sectionId = this.dataset.sectionId ?? "";
    const url = new URL(Theme.routes.search_url, location.origin);
    url.searchParams.set("type", "product");
    url.searchParams.set("q", searchQuery);
    url.searchParams.set("section_id", sectionId);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch products");

      const text = await response.text();
      const html = new DOMParser().parseFromString(text, "text/html");
      const fetchedGrid = html.querySelector(".js-wishlist-grid");

      if (fetchedGrid && fetchedGrid.innerHTML.trim() !== "") {
        if (this.container) {
          this.container.innerHTML = fetchedGrid.innerHTML;

          // Force visibility by removing Horizon's scroll animation locks
          this.container
            .querySelectorAll(".scroll-trigger, .scroll-trigger--hidden")
            .forEach((el) => {
              el.classList.remove("scroll-trigger", "scroll-trigger--hidden");
              if (el instanceof HTMLElement) {
                el.style.opacity = "1";
              }
            });
        }
      } else {
        if (this.container) this.container.style.display = "none";
        if (this.emptyState) this.emptyState.style.display = "flex";
      }
    } catch (error) {
      console.error("Wishlist Error:", error);
      if (this.container) {
        this.container.innerHTML =
          '<div style="padding: 50px 0; text-align: center;"><p>Something went wrong loading your wishlist. Please refresh the page.</p></div>';
      }
    }
  };
}

if (!customElements.get("wishlist-section")) {
  customElements.define("wishlist-section", WishlistSection);
}
