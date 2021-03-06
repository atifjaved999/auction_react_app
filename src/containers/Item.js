import React, { Component } from 'react';
import Timer from './Timer';
import { trim } from '../helpers/index';
import { BASEPATH } from "../constants/index";
class Item extends Component {
  renderBidNow = (item) => {
    if(!item.is_expired) {
      return(
        <button type="button" className="btn btn-secondary"
          onClick={() => this.props.onItemClick(item)}>
          Bid Now
        </button>
      )
    }
  }
  renderAutoBid = (item) => {
    if(!item.is_expired) {
      return(
        <div className="custom-control custom-switch item-container">
          <input id="autoBid" type="checkbox" className="custom-control-input"
            checked={item.autobids} onChange={() => this.props.autoBid(item)} />
          <label htmlFor="autoBid" className="custom-control-label" >AutoBid</label>
        </div>
      )
    }
  }
  render() {
    const {item} = this.props;
    return(
      <li className="list-group-item" key={item.id} >
        <div className="media align-items-lg-center flex-column flex-lg-row p-3">
          <div className="media-body order-2 order-lg-1">
            <h5 className="mt-0 font-weight-bold mb-2">{ trim(item.title, 30) }</h5>
            <p className="font-italic text-muted mb-0 small"> { trim(item.description, 200)} </p>
            <div className="d-flex align-items-center justify-content-between mt-1">
              <h6 className="font-weight-bold my-2">Price: ${ item.price }</h6>
              <h6 className="font-weight-bold my-2">Max Bid: ${ item.highest_bid }</h6>
              <Timer item={item}/>
            </div>
            <div className="d-flex align-items-center justify-content-between mt-1">
              {this.renderBidNow(item)}
              {this.renderAutoBid(item)}
            </div>
          </div><img src={`${BASEPATH}${item.primary_image}`} alt={`${item.title}`} width="200" className="ml-lg-5 order-1 order-lg-2" />
        </div>
      </li>
    )
  }
}
export default Item;
