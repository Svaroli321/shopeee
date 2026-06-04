document.querySelector(".store-products").innerHTML = "";

//<span class="store-product-sale-price-off">75% OFF</span>

products.forEach((product) => {
  if (!product) return;
  if (product.images.length === 0) return;
  if (
    !product.brand ||
    !product.reviews.total ||
    !product.name ||
    !product.regularPrice ||
    !product.salePrice ||
    !product.maxInstallments
  )
    return;

  discount = Math.round(
    ((product.regularPrice - product.salePrice) / product.regularPrice) * 100
  );
  randomStock = Math.floor(Math.random() * 10) + 1;
  document.querySelector(".store-products").innerHTML += `
    <div class="store-product" onclick="window.location.href='${
      product.redirectUrl
    }'">
      ${
        product.campaign
          ? `<span class="store-product-off-tag" style="background-color: ${product.campaign.badgeColor}; color: ${product.campaign.badgeTextColor};">${product.campaign.badgeText}</span>`
          : product.offPercentage
          ? `<span class="store-product-off-tag">${discount}% OFF</span>`
          : ``
      }
      ${
        !product.stock || product.stock <= 0
          ? `<span class="store-product-out-of-stock"><span>FORA DE ESTOQUE</span></span>`
          : ``
      }
      <img class="store-product-image" src="${product.images[0]}"/>
      <span class="store-product-brand">${product.brand}</span>
      <div class="store-product-stars-container">
        <span class="store-product-stars" style="width: 100%;"></span>
        <span class="store-product-rating">(${product.reviews.total})</span>
      </div>
      <span class="store-product-name">${product.name}</span>
      <div class="store-product-price-container">
        <span class="store-product-regular-price">${product.regularPrice.toLocaleString(
          "pt-BR",
          { style: "currency", currency: "BRL" }
        )}</span>
        <span class="store-product-sale-price">${product.salePrice.toLocaleString(
          "pt-BR",
          { style: "currency", currency: "BRL" }
        )}</span>
      </div>
      <span class="store-product-installments">Em até <span>${
        product.maxInstallments
      }x</span> de <span>${parseFloat(
    (product.salePrice * (product.maxInstallmentsInterest || 1)) /
      product.maxInstallments
  ).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span> ${
    product.maxInstallmentsInterest === 1 || !product.maxInstallmentsInterest
      ? `<span class="store-product-installments-interest-free">sem juros</span>`
      : ``
  }</span>
  <div>
          <div class='progress' style='height: 25px; border-radius: 10px; background: linear-gradient(90deg, #ffbda6 50%, #ffd4c7 100%); position: relative;'>
                

              <div class='progress-bar' role='progressbar' style='width: ${Math.max(
                ((15 - randomStock) / 15) * 100,
                25
              )}%; background: linear-gradient(90deg, #ec1c17 0%, #fead00 100%);' aria-valuenow='${
    ((15 - randomStock) / 15) * 100
  }' aria-valuemin='0' aria-valuemax='100'>
              </div>
              <div class='d-flex align-items-center justify-content-center' style='position: absolute; top: 0; left: 0; right: 0; bottom: 0;'>
                <span class='fw-bold text-white'>${randomStock} ITENS RESTANTES</span>
              </div>
            </div>
          </div>
          <a class="store-product-claim-discount${
            !product.stock || product.stock <= 0 ? ` disabled` : ``
          }" href="${
    product.stock > 0 ? product.redirectUrl : `#`
  }">Resgatar Desconto</a>
    </div>
  `;
});
