import React, { useState, useEffect, FC } from 'react'
import classNames from 'classnames'
import { createTempKey, mapEntries } from '../../utils'

// LINE ITEM

type LineItemProps = {
  description: string
  quantity: number
  cost: number
  price: number
}

const lineItemClass = classNames('InvoiceGrid--Item','xui-u-flex-1', 'xui-text-align-right')

const LineItem: FC<LineItemProps> = ({
  description,
  quantity,
  cost,
  price
}) => (
  <div className='InvoiceGrid--Content'>
    <div className={'InvoiceGrid--Description'}>{description}</div>
    <div className={lineItemClass}>{quantity}</div>
    <div className={lineItemClass}>{cost.toFixed(2)}</div>
    <div className={lineItemClass}>{price.toFixed(2)}</div>
  </div>
)

// INVOICE

type InvoiceProps = {
  lineItems: LineItemProps[]
}

export const Invoice: FC<InvoiceProps> = ({lineItems = []}) => {
  const content: {[key: string]: LineItemProps} = { 
    '1': {
      description: 'thsadkldsalkdsaldsdslksdlksjdlksjdslakjdldjsaldsalkdsajl', 
      quantity: 1, 
      cost: 30, 
      price: 4000,
    },
    '2': {
      description: 'this is a dslksdlksjdlksjdslakjdsadsadsadsadsdsadsadsadsaldjsaldsalkdsajl', 
      quantity: 1, 
      cost: 30, 
      price: 4000,
    },
    '3':{
      description: 'this is a description skjldaskdlasj', 
      quantity: 1, 
      cost: 30, 
      price: 4000,
    }
  }

  const [ total, setTotal ] = useState<Number>(0)

  useEffect(() => {
    setTotal(
      Object.values(lineItems)
        .reduce((a, value) => a + (value.price || 0), 0)
    )
  }, [lineItems])

  return(
    <div className='InvoiceGrid'>
      <div className='InvoiceGrid--Headings'>
        <div className={classNames('InvoiceGrid--Description', 'xui-text-label',)}>Description</div>
        <div className={classNames('InvoiceGrid--Item', 'xui-text-label','xui-u-flex-1', 'xui-text-align-right')}>Quantity</div>
        <div className={classNames('InvoiceGrid--Item', 'xui-text-label', 'xui-u-flex-1', 'xui-text-align-right')}>Cost</div>
        <div className={classNames('InvoiceGrid--Item', 'xui-text-label', 'xui-u-flex-1', 'xui-text-align-right')}>Price</div>
      </div>
      {mapEntries(content, ((id, item) => (
        <LineItem
          key={id} 
          description={item.description}
          quantity={item.quantity}
          cost={item.cost}
          price={item.price}
        />
      )))}
      <div className={'InvoiceFooter'}>
        <div className={'InvoiceFooter-Totals'}>
          <div className={'InvoiceFooter-Total'}>
            Total:
            <span className={'InvoiceFooter-AmountDueNumber'}>{`${total.toFixed(2)}`}</span>
          </div>
        </div>
      </div>
    </div>
  )
}