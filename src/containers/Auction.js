import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import {getItems, bidNow, autoBidActive, autoBidInactive} from '../utils/api/index';
import Item from './Item';
import ItemModal from './ItemModal';
import { setCurrentUser, getCurrentUser } from '../utils/storage';
import Login from './Login';

class Auction extends Component {
  constructor(){
    super();
    this.limit = 5;
    this.state = ({
      items: [],
      offset: 1,
      pageCount: 1,
      keyword: '',
      sortColumnValue: '',
      sortDirectionValue: 'desc',
      modalShow: false,
      selectedItem: {},
      currentUser: getCurrentUser()
    })
    this.setCurrentUser = this.setCurrentUser.bind(this)
  }

  loadItems(offset, limit, keyword='', sortCol='', sortDir='') {
    getItems(offset, limit, keyword, sortCol, sortDir).then((response) => {
      this.setState({
        items: response.items,
        pageCount: Math.ceil(response.total_count / this.limit),
        offset: offset + 1,
        keyword: keyword,
      });
    })
  }

  componentDidMount(){
    if(this.state.currentUser){
      this.loadItems(this.state.offset, this.limit);
    }
  }

  listItems = () => {
    const {items} = this.state
    if(items.length > 0){
      return items.map( (item, i) => {
        return (
          <Item item={item} key={i}
            onItemClick={(item) => this.onItemClick(item)}
            autoBid={() => this.autoBid(item)}
          />
        )
      })
    } else{
      return (<li className="no-result">No Result Found</li>)
    }
  }

  handlePageClick = (data) => {
    let offset = data.selected + 1
    this.loadItems(offset, this.limit, this.state.keyword, this.state.sortColumnValue, this.state.sortDirectionValue);
  };

  handleChange = (e) => {
    this.setState({ keyword: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      offset: 1
    },() => {
      this.loadItems(this.state.offset, this.limit, this.state.keyword, this.state.sortColumnValue, this.state.sortDirectionValue)
    });
  }

  handleChangeSortColumn = (e) => {
    const sortColumnValue = e.target.value
    if(sortColumnValue !== '') {
      this.setState({
        sortColumnValue, offset: 1
      }, () => {
        this.loadItems(1, this.limit, this.state.keyword, this.state.sortColumnValue, this.state.sortDirectionValue)
      })
    }
  }
  handleChangeSortDirection = (e) => {
    const sortDirectionValue = e.target.value
    if(sortDirectionValue !== '') {
      this.setState({
        sortDirectionValue, offset: 1
      }, () => {
        this.loadItems(1, this.limit, this.state.keyword, this.state.sortColumnValue, this.state.sortDirectionValue)
      })
    }
  }

  resetFilters = () => {
    this.setState({keyword: '', sortColumnValue: '', sortDirectionValue: '', offset: 1}, () => {
      this.loadItems(this.state.offset, this.limit, this.state.keyword)
    })
  }

  onItemClick = (selectedItem) => {
    this.setState({selectedItem}, () => {
      this.setState({modalShow: true})
    })
  }

  closeModal = () => {
    this.setState({modalShow: false})
  }

  bidNow(item, bidPrice) {
    bidNow(item, bidPrice).then((response) => {
      console.log('bid now response', response)
      window.location.reload()
    })
  }

  autoBid(item) {
    const active = !item.autobids;
    if(active){
      autoBidActive(item).then((res) => {
        console.log('active response', res)
        this.replaceItem(res.autobid.item)
      })
    } else {
      autoBidInactive(item).then((res) => {
        console.log('inactive response', res)
        this.replaceItem(res.autobid.item)
      })
    }
  }

  replaceItem = (item) => {
    let items = [...this.state.items];
    let index = items.findIndex(obj => obj.id === item.id);
    items[index] = item;
    this.setState({items});
  }

  setCurrentUser(currentUser) {
    console.log('currentUSer', currentUser)
    setCurrentUser(currentUser)
    this.setState({currentUser}, () => {
      this.loadItems(this.state.offset, this.limit);
    })

  }

  render(){
    console.log('currentUser', this.state.currentUser)
    if(!this.state.currentUser){
      return(<Login setCurrentUser={this.setCurrentUser} currentUser={this.state.currentUser}/>)
    } else {
      return(
        <div className="container py-5">
          <div className="row text-center text-white mb-5">
            <div className="col-lg-7 mx-auto">
              <h1 className="display-4">Auction Items</h1>
            </div>
          </div>
          {/* Search & Filters */}
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <ul className="list-group shadow list-group-item">
                <div className="search-container">
                  <select className="btn btn-secondary form-select"
                    value={this.state.sortColumnValue}
                    onChange={this.handleChangeSortColumn} >
                    <option value=''>Sort Column</option>
                    <option value="title">Title</option>
                    <option value="price">Price</option>
                  </select>

                  <select className="btn btn-secondary form-select"
                    value={this.state.sortDirectionValue}
                    onChange={this.handleChangeSortDirection} >
                    <option value=''>Sort Direction</option>
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                  </select>

                  <input placeholder="Search Items" value={this.state.keyword} name="keyword" onChange={this.handleChange}/>
                  <button type="submit" className="btn btn-secondary" onClick={this.handleSubmit}>Search</button>
                  <button type="button" className="btn btn-light" onClick={this.resetFilters} >Reset</button>
                </div>
              </ul>
            </div>
          </div>
          <br />
          {/* Listing */}
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <ul className="list-group shadow">
                {this.listItems()}
              </ul>
            </div>
          </div>
          {/* Pagination */}
          { this.state.pageCount > 1 &&
            <div className="row">
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
              />
            </div>
          }
          { this.state.modalShow &&
            <ItemModal
              show={this.state.modalShow}
              item={this.state.selectedItem}
              onHide={this.closeModal}
              bidNow={this.bidNow}
            />
          }
        </div>
      )
    }
  }
}
export default Auction;