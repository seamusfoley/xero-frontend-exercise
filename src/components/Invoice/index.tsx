import React, { useState, useEffect, FC } from 'react'
import { LineItemState } from '../../types'

// LINE ITEM
type LineItemProps = {
  description: string
  quantity: number
  cost: number
  price: number
}

const lineItemClass = `
  InvoiceGrid--Item 
  xui-u-flex-1
  xui-text-align-right
`

const LineItem: FC<LineItemProps> = ({
  description,
  quantity,
  cost,
  price,
}) => (
  <div className="InvoiceGrid--Content">
    <div className={'InvoiceGrid--Description'}>{description}</div>
    <div className={lineItemClass}>{quantity}</div>
    <div className={lineItemClass}>{Number(cost).toFixed(2)}</div>
    <div className={lineItemClass}>{Number(price).toFixed(2)}</div>
  </div>
)

// INVOICE
type InvoiceProps = {
  lineItems?: LineItemState
}

export const Invoice: FC<InvoiceProps> = ({ lineItems = [] }) => {
  const [total, setTotal] = useState<Number>(0)

  useEffect(() => {
    setTotal(
      Object.values(lineItems).reduce((a, value) => a + (value.price || 0), 0),
    )
  }, [lineItems])

  const lineItemClassNames = `
    InvoiceGrid--Item
    xui-text-label
    xui-u-flex-1
    xui-text-align-right
  `

  return (
    <div className="InvoiceGrid">
      <div className="InvoiceGrid--Headings">
        <div
          className={`InvoiceGrid--Description xui-text-label`}
        >
          Description
        </div>
        <div className={lineItemClassNames}>Quantity</div>
        <div className={lineItemClassNames}>Cost</div>
        <div className={lineItemClassNames}>Price</div>
      </div>
      {Object.entries(lineItems).map(([id, item]) => (
        <LineItem
          key={id}
          description={item.description}
          quantity={item.quantity}
          cost={item.cost}
          price={item.price}
        />
      ))}
      <div className={'InvoiceFooter'}>
        <div className={'InvoiceFooter-Totals'}>
          <div className={'InvoiceFooter-Total'}>
            Total:
            <span className={'InvoiceFooter-AmountDueNumber'}>{`${Number(
              total,
            ).toFixed(2)}`}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
