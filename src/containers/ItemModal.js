import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Timer from './Timer';
class ItemModal extends Component {
  constructor(){
    super();
    this.state = ({
      bidPrice: ''
    })
  }

  handlePriceChange = (e) => {
    this.setState({bidPrice: e.target.value})
  }

  render(){
    const {item} = this.props;
    return (
      <>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          animation={false}
        >
          <Modal.Header closeButton>
            <div>
              <Modal.Title id="contained-modal-title-vcenter">
                <Timer item={item}/>
              </Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body>
            <h4>{ item.title }</h4> <br/>
            <div className="row">
              <div className="col-sm-4">
                <label>Price: </label>
                <input type="number" value={this.state.bidPrice} onChange={this.handlePriceChange} className="form-control"/>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-secondary" onClick={this.props.onHide}>Close</button>
            <button className="btn btn-primary" onClick={() => this.props.bidNow(item, this.state.bidPrice)}>Bid Now</button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ItemModal;