import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { selectCartItems, selectCartTotal,selectCartItemsCount } from './../../redux/Cart/cart.selectors';
import { createStructuredSelector } from 'reselect';
import './styles.scss';
import Button from './../forms/Button';
import Item from './Item';
import {saveOrderHistory} from './../../redux/Orders/orders.actions'

const mapState = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  itemCount: selectCartItemsCount,
});

const Checkout = ({ }) => {
  const history = useHistory();
  const { cartItems, total, itemCount } = useSelector(mapState);
  
  const dispatch = useDispatch();
  const configOrder={
    orderTotal:total,
    orderItems: cartItems.map(item => {
      const { documentID, productThumbnail, productName,
        productPrice, quantity } = item;

        return {
          documentID,
          productThumbnail,
          productName,
          productPrice,
          quantity
        }
      })

  }
  const orderHis=()=>{
    dispatch(saveOrderHistory(configOrder));
    history.push('/payment');
  }

  const errMsg = 'You have no items in your cart.';

  return (
    <div className="checkout">
      <h1>
        Checkout
      </h1>

      <div className="cart">
        {cartItems.length > 0 ? (
          <table border="0" cellPadding="0" cellSpacing="0">
            <tbody>
              <tr>
                <td>
                  <table className="checkoutHeader" border="0" cellPadding="10" cellSpacing="0">
                    <tbody>
                      <tr>
                        <th>
                          Product
                        </th>
                        <th>
                          Description
                        </th>
                        <th>
                          Quantity
                        </th>
                        <th>
                          Price
                        </th>
                        <th>
                          Remove
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table border="0" cellSpacing="0" cellPadding="0">
                    <tbody>
                      {cartItems.map((item, pos) => {
                        return (
                          <tr key={pos}>
                            <td>
                              <Item {...item} />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table border="0" cellSpacing="0" cellPadding="0">
                    <tbody>
                      <tr>
                        <td>
                          <table border="0" cellPadding="10" cellSpacing="0">
                            <tbody>
                              <tr>
                                <td>
                                <h3>
                                  Total: ₹{total}
                                </h3>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <table border="0" cellPadding="10" cellSpacing="0">
                            <tbody>
                              <tr>
                                <td>
                                  <Button onClick={() => history.goBack()}>
                                    Continue Shopping
                                  </Button>
                                </td>
                                <td>
                                  <Button onClick={() => orderHis()}>
                                    Checkout
                                  </Button>
                                  {/* <Button>
                                    Checkout
                                  </Button> */}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        ) : (
            <p>
              {errMsg}
            </p>
          )}
      </div>
    </div>
  );
};

export default Checkout;
