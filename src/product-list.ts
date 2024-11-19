import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { Task } from "@lit/task";
import { map } from "lit/directives/map.js";
import type { Product } from "./types/Product";

import "./product-card";
import "./product-detail";

@customElement("product-list")
export class ProductList extends LitElement {
  @property() productId = "";
  @property() url = "https://fakestoreapi.com/products?limit=6";

  @state()
  private _selectedProduct = {};
  private _productsTask = new Task(this, {
    task: async () => {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();
      if (this.productId) {
        this._selectedProduct = data.find(
          (p: Product) => p.id === parseInt(this.productId)
        );
        console.log(this._selectedProduct);
      }
      return data;
    },
    args: () => [],
  });
  private handleSelectedProduct({ detail }: { detail: number }) {
    this._productsTask.render({
      complete: (products) => {
        this._selectedProduct = products.find((p: Product) => p.id === detail);
      },
    });
  }
  private resetSelectedProduct() {
    this._selectedProduct = {};
  }
  render() {
    return this._productsTask.render({
      pending: () => html`<p>Loading product...</p>`,
      complete: (products) =>
        html`
          <div class="list">
            ${Object.keys(this._selectedProduct).length === 0
              ? map(products, (product) => {
                  return html`
                <product-card
                  @onSelectedProduct=${this.handleSelectedProduct}
                  .card=${product}
                ></product-card>
                </div>
              `;
                })
              : ""}
          </div>
          ${Object.keys(this._selectedProduct).length > 0
            ? html`
                <product-detail
                  .detail=${this._selectedProduct}
                  @onResetDetail=${this.resetSelectedProduct}
                ></product-detail>
              `
            : ""}
        `,
      error: (e) => html`<p>Error: ${e}</p>`,
    });
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
    }
    .list {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 10px;
    }
      img {
        border 4px solid red;
      }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "product-list": ProductList;
  }
}
