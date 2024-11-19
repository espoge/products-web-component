import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Product } from "./types/Product";
import { imageStyle } from "./assets/css/image-style.ts";

@customElement("product-detail")
export class ProductDetail extends LitElement {
  @property() detail = {} as Product;
  render() {
    return html`<div class="detail">
      <div class="left-column">
        <img
          class="product-image"
          src="${this.detail.image}"
          alt="${this.detail.title}"
        />
      </div>
      <div class="right-column">
        <span
          class="back-to-list"
          @click=${() => this.dispatchEvent(new CustomEvent("onResetDetail"))}
          >Back to List</span
        >
        <h2 class="product-name">${this.detail.title}</h2>
        <p>${this.detail.category}</p>
        <p>${this.detail.description}</p>
        <p class="price">${this.detail.price} $</p>
      </div>
    </div>`;
  }
  static styles = [
    imageStyle,
    css`
      .detail {
        display: flex;
      }
      .left-column {
        width: 40%;
        padding: 20px;
      }
      .right-column {
        width: 60%;
      }
      .product-name {
        font-weight: 500;
        font-size: 30px;
      }
      .price {
        font-weight: 500;
        font-size: 20px;
        text-align: right;
      }
      .back-to-list {
        cursor: pointer;
        text-decoration: underline;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "product-detail": ProductDetail;
  }
}
