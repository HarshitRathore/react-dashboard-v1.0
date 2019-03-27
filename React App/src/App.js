import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import './App.css';
import $ from "jquery";
import { all_data_, all_categories_, all_keys_ } from "./fakedata.js";

let all_data = all_data_;
let all_categories = all_categories_;
let all_keys = all_keys_

console.log(all_data);
console.log(all_categories);
console.log(all_keys);

class App extends Component {
  constructor() {
    super();
    this.state = {
      input_enabled: false,
      choosen_category: all_categories[0],
      choosen_key: all_keys[all_categories[0]][0],
      data: {},
      is_edit: false
    };
    this.add_category = this.add_category.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
    this.add_key = this.add_key.bind(this);
    this.save_key = this.save_key.bind(this);
    this.changeKey = this.changeKey.bind(this);
    this.edit_details = this.edit_details.bind(this);
    this.save_details = this.save_details.bind(this);
    this.add_keyword = this.add_keyword.bind(this);
    this.save_keyword = this.save_keyword.bind(this);
  }
  add_category(e) {
    if (this.state.is_edit) {
      alert('Finish the changes, then add a new category!!!');
      return;
    }
    let x = $("#new-category").val();
    let value = this.state.data;
    value[x] = {};
    this.setState({
      data: value
    });
    all_data[x] = {};
    all_categories.push(x);
    all_keys[x] = []
    console.log(all_data);
    console.log(all_categories);
    console.log(all_keys);
  }
  changeCategory(e) {
    if (this.state.is_edit) {
      alert('Finish the changes, then change to a another category!!!');
      return;
    }
    console.log(all_keys[e.target.id][0])
    this.setState({
      choosen_category: e.target.id,
      choosen_key: all_keys[e.target.id][0]
    });
  }
  add_key(e) {
    if (this.state.is_edit) {
      alert('Finish the changes, then add a new key!!!');
      return;
    }
    $("#key-input").show();
  }
  save_key(e) {
    let y = $("#new-key").val();
    let found_flag = true;
    for (var i in this.state.data) {
      if (this.state.choosen_category == i) {
        found_flag = false;
        break;
      }
    }
    if (found_flag || $.isEmptyObject(this.state.data)) {
      console.log("Adding new category in data")
      let value_1 = this.state.data;
      value_1[this.state.choosen_category] = {};
      this.setState({
        data: value_1
      });
    }
    let x = this.state.data;
    console.log(this.state.data)
    x[this.state.choosen_category][y] = [[], ''];
    let value = x;
    this.setState({
      data: value
    });
    $("#key-input").hide();
    all_data[this.state.choosen_category][y] = [[],''];
    all_keys[this.state.choosen_category].push(y);
    console.log(all_data);
    console.log(all_keys);
    if (this.state.choosen_key === undefined) {
      this.setState({
        choosen_key: y
      });
    }
  }
  changeKey(e) {
    if (this.state.is_edit) {
      alert('Finish the changes, then change to a another key!!!');
      return;
    }
    this.setState({
      choosen_key: e.target.id
    });
  }
  edit_details(e) {
    this.setState({
      is_edit: true
    });
    $("#before-edit").hide();
    $("#on-edit").show();
  }
  save_details(e) {
    this.setState({
      is_edit: false
    });
    $("#before-edit").show();
    $("#on-edit").hide();
    let j = all_data[this.state.choosen_category][this.state.choosen_key];
    j[1] = $("#edit-answer").val();
    let found_flag = true;
    for (var i in this.state.data) {
      if (this.state.choosen_category == i) {
        let k = this.state.data;
        k[this.state.choosen_category][this.state.choosen_key] = j;
        console.log(k)
        this.setState({
          data: k
        });        
        found_flag = false;
        break;
      }
    }
    if (found_flag || $.isEmptyObject(this.state.data)) {
      console.log("Adding new category in data")
      let value_1 = this.state.data;
      value_1[this.state.choosen_category] = {};
      value_1[this.state.choosen_category][this.state.choosen_key] = j;
      this.setState({
        data: value_1
      });
    }

    // Sending data to API or Database
    let url = "http://127.0.0.1/InsertOneItem";
    $.post(url, {
      data: this.state.data
    }, function(response) {
      alert("Response: "+response);
      this.setState({
        data: {}
      });
    });
  }
  add_keyword(e) {
    $("#keyword-input").show();
    $("#keyword-+").hide();
  }
  save_keyword(e) {
    let j = all_data[this.state.choosen_category][this.state.choosen_key];
    j[0].push($("#new-keyword").val());
    $("#keyword-input").hide();
    $("#keyword-+").show();
    let found_flag = true;
    for (var i in this.state.data) {
      if (this.state.choosen_category == i) {
        let k = this.state.data;
        k[this.state.choosen_category][this.state.choosen_key] = j;
        console.log(k)
        this.setState({
          data: k
        });        
        found_flag = false;
        break;
      }
    }
    if (found_flag || $.isEmptyObject(this.state.data)) {
      console.log("Adding new category in data")
      let value_1 = this.state.data;
      value_1[this.state.choosen_category] = {};
      value_1[this.state.choosen_category][this.state.choosen_key] = j;
      this.setState({
        data: value_1
      });
    }
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark theme-bg">
          <div className="col-sm-3">
            <a className="navbar-brand" href="#"> Client Logo </a>
          </div>
          <div className="col-sm-3" />
          <div className="col-sm-3">
            <div className="input-group nav_input_1" >
              <button className="btn btn-outline-primary" type="button">
                <i className="fas fa-search c-white" />
              </button>
              <input type="text" className="form-control c_white theme-bg b-0" />
            </div>
          </div>
          <div className="col-sm-3 align-right">
            <button className="btn btn-outline-primary btn-lg" type="button">
              <i className="fas fa-microphone c_white" />
            </button>
            <button className="btn btn-outline-primary btn-lg" type="button">
              <i className="fas fa-th c_white" />
            </button>
            <button className="btn btn-outline-primary btn-lg" type="button">
              <i className="far fa-bell c_white" />
            </button>
            <button className="btn btn-outline-primary btn-lg" type="button">
              <i className="far fa-user c_white" />
            </button>
          </div>
        </nav>
        <nav className="navbar navbar-light navbar-expand-md bg-light justify-content-between py-0 h-5 font-12" >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#"> Performance Analysis </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"> Network Insights </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#"> Spend Analytics </a>
            </li>
          </ul>
          <div className="col-1">
            <button className="btn text-dark" type="button">
              <i className="fas fa-angle-left" />
            </button>
            <button className="btn text-dark" type="button">
              <i className="fas fa-angle-right" />
            </button>
          </div>
        </nav>
        <div className="container-fluid border justify-content-between">
          <div className="row">
            <div className="col-1" />
            <div className="col-11">
              <div className="row justify-content-between border-bottom">
                <div className="col-5 nav_bar_2" > Category Configuration </div>
                <form className="form-inline my-2 my-lg-0 col-5 has-search pr-30" >
                  <input className="form-control mr-sm-2 incident_search_input" type="search" placeholder="Search Incident Box" aria-label="Search" />
                  <span className="fa fa-search form-control-feedback display-block" />
                </form>
              </div>
              <div className="row pt-10 my-2 w-100">
                <div className="col-2" >
                  <button className="btn btn-outline-primary my-2 font-12 add_cat_btn" onClick={this.add_category} >
                    New Category
                  </button>
                </div>
                <div className="col-10">
                  <input id="new-category" className="font-12 add_cat_input" type="search" placeholder="Enter category name" aria-label="Search" />
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 ">
                  <strong>List of Categories</strong>
                </div>
                <div className="col-md-9" >
                  <div id="key-input" className="form-inline align-items-center">
                    <input id="new-key" className="form-control form-control-sm" type="text" />
                    <span style={{ margin: "5px" }}></span>
                    <button className="btn btn-primary btn-sm mb-2" onClick={this.save_key} >Add</button>
                  </div>
                </div>
              </div>
              <div className="row" >
                <div className="col-md-2 cat_list_box" >
                  <ul className="list-group">
                    {all_categories.map((data, i) => (
                      <li className={this.state.choosen_category == data ? "list-group-item active font-14 cat-item" : "list-group-item font-14 cat-item"} id={data} key={i} onClick={this.changeCategory} >
                        {data}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-2 cat-key" >
                  <ul className="list-group" >
                    <li className="list-group-item active font-14 key-item">
                      Answer ID
                      <span style={{ margin: '5px' }}></span>
                      <button className="btn btn-outline-primary bg-light rounded font-12 detail-header-edit-btn" type="button" onClick={this.add_key} >
                        Edit
                      </button>
                    </li>
                    {all_keys[this.state.choosen_category].map((data, i) => (
                      <li className={this.state.choosen_key == data ? "list-group-item active font-14 key-item" : "list-group-item font-14 key-item"} id={data} key={i} onClick={this.changeKey} >
                        {data}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-md-7 key-detail" >
                  <div className="row">
                    <div id="before-edit" className="w-100" >
                      <div className="row justify-content-between detail-header" >
                        <p className="detail-header-key font-14" >
                          {
                            all_keys[this.state.choosen_category].length == 0 ? ('-') : this.state.choosen_key
                          }
                        </p>
                        <button className="btn btn-outline-primary rounded font-12 detail-header-edit-btn" type="button" onClick={this.edit_details} >
                          Edit
                        </button>
                      </div>
                      <div className="row detail-keywords" >
                      {
                        all_keys[this.state.choosen_category].length == 0
                         ? 
                         (<span className="badge badge-pill m-1 keywords-badge" >
                            -
                          </span>)
                         :
                          all_data[this.state.choosen_category][this.state.choosen_key][0].length === 0 ? (
                            <span className="badge badge-pill m-1 keywords-badge" >
                              No Keywords
                              </span>
                          ) : (
                              all_data[this.state.choosen_category][this.state.choosen_key][0].map(data => (
                                <span key={data} className="badge badge-pill m-1 keywords-badge" >
                                  {data}
                                </span>
                              ))
                            )
                      }
                      </div>
                      <div className="col-md-12 w-100" >
                        <div className="detail-answer-header">
                          <span className="detail-answer-header-text">Answer Description</span>
                        </div>
                        <div className="detail-answer-block" >
                          <p type="text" className="text font-12 detail-answer" >
                            {
                              all_keys[this.state.choosen_category].length == 0
                               ? ('-') 
                               : all_data[this.state.choosen_category][this.state.choosen_key][1]
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                    <div id="on-edit" className="w-100" >
                      <div className="row justify-content-between detail-header" >
                        <p className="detail-header-key font-14" >
                          {
                            all_keys[this.state.choosen_category].length == 0 ? ('-') : this.state.choosen_key
                          }
                        </p>
                      </div>
                      <div className="row detail-keywords" >
                      {
                        all_keys[this.state.choosen_category].length == 0
                         ? 
                         (<span className="badge badge-pill m-1 keywords-badge" >
                            -
                          </span>)
                         :
                          all_data[this.state.choosen_category][this.state.choosen_key][0].length === 0 ? (
                            <span className="badge badge-pill m-1 keywords-badge" >
                              No Keywords
                              </span>
                          ) : (
                              all_data[this.state.choosen_category][this.state.choosen_key][0].map(data => (
                                <span key={data} className="badge badge-pill m-1 keywords-badge" >
                                  {data}
                                </span>
                              ))
                            )
                      }
                        <span className="badge badge-pill m-1 add-keywords-badge" onClick={this.add_keyword} >
                          <span id="keyword-+">+</span>
                        </span>
                        <div id="keyword-input" className="form-row align-items-center">
                          <div className="col-auto">
                            <input id="new-keyword" className="form-control form-control-sm" type="text" />
                          </div>
                          <div className="col-auto">
                            <button className="btn btn-primary btn-sm mb-2" onClick={this.save_keyword} >Add</button>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 w-100" >
                        <div className="detail-answer-header">
                          <span className="detail-answer-header-text">Answer Description</span>
                        </div>
                        <div className="form-group">
                          <textarea className="form-control" id="edit-answer" rows="3" 
                          data={
                              all_keys[this.state.choosen_category].length == 0
                               ? ('-') 
                               : all_data[this.state.choosen_category][this.state.choosen_key][1]
                            }>
                          </textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 bottom-bar" >
          <button className="btn btn-outline-primary my-2 my-sm-0 rounded font-12 save-button" type="submit" onClick={this.save_details} >
            Save Changes
          </button>
        </div>
      </div>
    );
  }
}

export default App;
