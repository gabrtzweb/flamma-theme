import { Component } from "@theme/component";

// 1. BUBBLE COUNTER UPDATER (For the header actions)
// Mode 1: The Bubble
class WishlistBubble extends HTMLElement {
  connectedCallback() {
    this.boundUpdate = this.update.bind(this);
    document.addEventListener("flamma:wishlist:updated", this.boundUpdate);
    this.update();

    this.observer = new MutationObserver(() => {
      this.observer.disconnect();
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
    document.removeEventListener("flamma:wishlist:updated", this.boundUpdate);
    if (this.observer) this.observer.disconnect();
  }

  update() {
    const wishlist = JSON.parse(
      localStorage.getItem("flamma-wishlist-v1") || "[]",
    );
    const newCount = wishlist.length;

    this.textContent = newCount;

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
  }
}

if (!customElements.get("wishlist-bubble")) {
  customElements.define("wishlist-bubble", WishlistBubble);
}

// Mode 2: Filled Icon
class WishlistHeaderIcon extends HTMLElement {
  connectedCallback() {
    this.boundUpdate = this.update.bind(this);
    document.addEventListener("flamma:wishlist:updated", this.boundUpdate);
    this.update();

    this.observer = new MutationObserver(() => {
      this.observer.disconnect();
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
    document.removeEventListener("flamma:wishlist:updated", this.boundUpdate);
    if (this.observer) this.observer.disconnect();
  }

  update() {
    const wishlist = JSON.parse(
      localStorage.getItem("flamma-wishlist-v1") || "[]",
    );
    const isLiked = wishlist.length > 0;

    const emptyIcon = this.querySelector(".wishlist-icon--empty");
    const filledIcon = this.querySelector(".wishlist-icon--filled");

    if (emptyIcon) emptyIcon.style.display = isLiked ? "none" : "";
    if (filledIcon) filledIcon.style.display = isLiked ? "" : "none";
  }
}

if (!customElements.get("wishlist-header-icon")) {
  customElements.define("wishlist-header-icon", WishlistHeaderIcon);
}

// 2. THE BUTTON COMPONENT (For individual hearts)
class WishlistButton extends Component {
  connectedCallback() {
    super.connectedCallback();
    this.productId = this.dataset.productId;
    this.updateIcon();
    document.addEventListener(
      "flamma:wishlist:updated",
      this.updateIcon.bind(this),
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener(
      "flamma:wishlist:updated",
      this.updateIcon.bind(this),
    );
  }

  toggle(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!this.productId) return;

    // Visual animation only
    this.classList.add("is-animating");
    setTimeout(() => this.classList.remove("is-animating"), 300);

    let wishlist = JSON.parse(
      localStorage.getItem("flamma-wishlist-v1") || "[]",
    );
    const index = wishlist.indexOf(this.productId);

    if (index > -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(this.productId);
    }

    localStorage.setItem("flamma-wishlist-v1", JSON.stringify(wishlist));
    document.dispatchEvent(new CustomEvent("flamma:wishlist:updated"));
  }

  updateIcon() {
    if (!this.productId) return;
    const wishlist = JSON.parse(
      localStorage.getItem("flamma-wishlist-v1") || "[]",
    );
    const isLiked = wishlist.includes(this.productId);

    const emptyIcon = this.querySelector(".wishlist-icon--empty");
    const filledIcon = this.querySelector(".wishlist-icon--filled");

    if (emptyIcon) emptyIcon.style.display = isLiked ? "none" : "";
    if (filledIcon) filledIcon.style.display = isLiked ? "" : "none";
  }
}

if (!customElements.get("wishlist-button")) {
  customElements.define("wishlist-button", WishlistButton);
}

// 3. THE SECTION COMPONENT (For the page)

class WishlistSection extends HTMLElement {
  connectedCallback() {
    this.container = this.querySelector('[ref="container"]');
    this.emptyState = this.querySelector('[ref="emptyState"]');
    this.boundLoad = this.loadWishlist.bind(this);

    document.addEventListener("flamma:wishlist:updated", this.boundLoad);
    this.loadWishlist();
  }

  disconnectedCallback() {
    document.removeEventListener("flamma:wishlist:updated", this.boundLoad);
  }

  loadWishlist() {
    const wishlist = JSON.parse(
      localStorage.getItem("flamma-wishlist-v1") || "[]",
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
  }

  async fetchProducts(ids) {
    const searchQuery = ids.map((id) => `id:${id}`).join(" OR ");
    const url = `${window.Shopify.routes.root}search?type=product&q=${encodeURIComponent(searchQuery)}&section_id=${this.dataset.sectionId}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch products");

      const text = await response.text();
      const html = new DOMParser().parseFromString(text, "text/html");
      const fetchedGrid = html.querySelector(".js-wishlist-grid");

      if (fetchedGrid && fetchedGrid.innerHTML.trim() !== "") {
        this.container.innerHTML = fetchedGrid.innerHTML;

        // Force visibility by removing Horizon's scroll animation locks
        this.container
          .querySelectorAll(".scroll-trigger, .scroll-trigger--hidden")
          .forEach((el) => {
            el.classList.remove("scroll-trigger", "scroll-trigger--hidden");
            el.style.opacity = "1";
          });
      } else {
        if (this.container) this.container.style.display = "none";
        if (this.emptyState) this.emptyState.style.display = "flex";
      }
    } catch (error) {
      console.error("Wishlist Error:", error);
      this.container.innerHTML =
        '<div style="padding: 50px 0; text-align: center;"><p>Something went wrong loading your wishlist. Please refresh the page.</p></div>';
    }
  }
}

if (!customElements.get("wishlist-section")) {
  customElements.define("wishlist-section", WishlistSection);
}
