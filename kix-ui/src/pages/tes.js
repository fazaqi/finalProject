import React, { Component } from "react";
import Select from "react-select";
import { Button } from "react-bootstrap";
import Axios from "axios";
import { APIURL } from "../helper/apiUrl";

class Tes extends Component {
  state = {
    kategori: null,
    listCat: null
  };

  componentDidMount() {
    Axios.get(`${APIURL}manage/getkategori`)
      .then(res => {
        this.setState({ listCat: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleChange = kategori => {
    this.setState({ kategori }, () =>
      console.log(`Option selected:`, this.state.kategori)
    );
  };

  btnSubmit = () => {
    let hasilkategori = this.state.kategori.map(val => val.value);
    console.log(hasilkategori);
    // console.log(typeof hasilkategori[1]);
  };

  render() {
    const { kategori } = this.state;

    console.log(this.state.listCat);
    // const opt = this.state.listCat.map(val => {
    //   return { value: val, label: val };
    // });
    // console.log(opt);

    // const options = [
    //   { value: "formal", label: "Formal" },
    //   { value: "sneakers", label: "Sneakers" },
    //   { value: "casual", label: "Casual" },
    //   { value: "pria", label: "Pria" },
    //   { value: "wanita", label: "Wanita" },
    //   { value: "unisex", label: "Unisex" }
    // ];
    return (
      <div>
        <Select
          isMulti
          defaultValue={kategori}
          // value={kategori}
          onChange={this.handleChange}
          options={this.state.listCat}
        />
        <Button onClick={this.btnSubmit}>Submit</Button>
      </div>
    );
  }
}

export default Tes;

// style={{ border: "1px solid red" }}
