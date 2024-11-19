import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Product } from "./types/Product";
import { imageStyle } from "./assets/css/image-style.ts";

@customElement("product-card")
export class ProductCard extends LitElement {
  @property() card = {} as Product;

  selectedCard() {
    this.dispatchEvent(
      new CustomEvent("onSelectedProduct", {
        detail: this.card.id,
      })
    );
  }
  render() {
    return html`<div class="card" @click=${() => this.selectedCard()}>
      <img
        class="product-image"
        src="${this.card.image}"
        alt="${this.card.title}"
      />
      <h2 class="product-name">${this.card.title} ${this.card.id}</h2>
    </div>`;
  }
  static styles = [
    imageStyle,
    css`
      .card {
        border: 1px solid #ccc;
        padding: 10px;
        cursor: pointer;
      }
      .product-name {
        font-weight: 500;
        font-size: 18px;
        text-align: center;
        text-decoration: underline;
        cursor: pointer;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "product-card": ProductCard;
  }
}
