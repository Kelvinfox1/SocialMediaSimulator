(async function () {
  async function fetchJson(url) {
    let res = await fetch(url)

    return await res.json()
  }

  let products = await fetchJson('data.json')
  let location = await fetchJson(
    'https://api.ipdata.co?api-key=<YOUR_API_KEY>&fields=currency'
  )
  let exchange = await fetchJson(
    'https://openexchangerates.org/api/latest.json?app_id=<YOUR_API_KEY>'
  )

  fx.base = exchange.base
  fx.rates = exchange.rates

  let tbody = document.getElementById('product-table').tBodies[0]

  products.forEach(function (p) {
    let row = tbody.insertRow()

    let nameCell = row.insertCell()
    let priceCell = row.insertCell()

    nameCell.innerHTML = p.name
    priceCell.innerHTML =
      location.currency.symbol +
      '' +
      fx(p.price).from('EUR').to(location.currency.code).toFixed(2)
  })
})()
