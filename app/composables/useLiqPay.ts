export const useLiqPay = () => {
  const openCheckout = (payment: { data: string; signature: string }) => {
    const form = document.createElement('form')
    form.method = 'POST'
    form.action = 'https://www.liqpay.ua/api/3/checkout'

    const dataInput = document.createElement('input')
    dataInput.name = 'data'
    dataInput.type = 'hidden'
    dataInput.value = payment.data

    const sigInput = document.createElement('input')
    sigInput.name = 'signature'
    sigInput.type = 'hidden'
    sigInput.value = payment.signature

    form.appendChild(dataInput)
    form.appendChild(sigInput)

    document.body.appendChild(form)
    form.submit()
  }

  return { openCheckout }
}
