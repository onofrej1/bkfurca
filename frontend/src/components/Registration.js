import React, { Component } from "react";
import Form from "./Form/Form";
import Field from "./Form/Field";
import SidebarLayout from "./Common/SidebarLayout";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import axios from "axios";
import FontAwesome from "react-fontawesome";

class Registration extends Component {
  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = { form: props.model || {} };
    this.sendForm = this.sendForm.bind(this);
  }

  sendForm(data) {
    let url = this.props.resourceBaseUrl + "/Registration";
    data.born = data.year + "-" + data.month + "-" + data.day;
    axios.post(url, data).then(result => {
      //this.setState({ form: {} });
    });
  }

  render() {
    const confirmText =
      "Prehlasujem, že som dostatočne pripravený pre účasť na týchto bežeckých pretekoch organizovaných O5 bežeckým klubom Furča. Môj zdravotný stav a kondičná pripravenosť mi umožňujú absolvovať preteky, absolvoval som príslušnú zdravotnú prehliadku a štartujem na vlastnú zodpovednosť. Nie som si vedomý žiadnych závažných zdravotných ťažkostí, ktoré by mi zabraňovali absolvovať plnú fyzickú záťaž spojenú s účasťou vo vybranej disciplíne. V súlade so zákonom č. 122/2013 o ochrane osobných údajov, súhlasím so spracovaním a uchovávaním osobných údajov. ";

    const categories = [      
      { value: "A", label: "Muzi do 39 rokov" },
      { value: "B", label: "Muzi do 49 rokov" },
      { value: "C", label: "Muzi do 59 rokov" } // check by default
    ];

    const months = [{value: '', label: 'mesiac'}];
    for (let i = 1; i <= 12; i++) {
      months.push({ value: i, label: i });
    }

    const days = [{value: '', label: 'den'}];
    for (let i = 1; i <= 31; i++) {
      days.push({ value: i, label: i });
    }

    const years = [{value: '', label: 'rok'}];
    for (let i = 1940; i <= 2002; i++) {
      years.push({ value: i, label: i });
    }

    let BornDate = (
      <Row className="form-group">
        <Col md={2}>Rok nar.</Col>
        <Col md={10}>
          <Field
            component="select"
            name="day"
            options={days}
            className="form-control form-control-sm short-input"
          />{" "}
          <Field
            component="select"
            name="month"
            options={months}
            className="form-control form-control-sm short-input"
          />{" "}
          <Field
            component="select"
            name="year"
            options={years}
            className="form-control form-control-sm short-input"
          />
        </Col>
      </Row>
    );

    return (
      <SidebarLayout contentTitle="Prihlaska">
        <p>
          <strong>Štafetový maratón dvojčlenných družstiev</strong> – vyplniť
          prihlasovací formulár aj s menom, priezviskom a dátumom narodenia
          spolubežca (každý pretekár podáva prihlášku sám za seba).{" "}
        </p>
        <Form processForm={this.sendForm} formType="grid">
          <Field
            label="Kategoria"
            component="select"
            name="category"
            emptyOption
            options={categories}
            className="form-control form-control-sm"
          />
          {BornDate}
          <Field
            type="text"
            label="Priezvisko"
            name="lname"
            className="form-control form-control-sm"
          />
          <Field
            type="text"
            label="Meno"
            name="fname"
            className="form-control form-control-sm"
          />
          <Field
            type="text"
            label="Ulica"
            placeholder="Zadajte ulicu a cislo"
            name="street"
            className="form-control form-control-sm"
          />
          <Field
            type="text"
            label="PSC"
            name="psc"
            className="form-control form-control-sm"
          />
          <Field
            type="text"
            label="Mesto"
            name="city"
            className="form-control form-control-sm"
          />
          <Field
            label="Stat"
            component="select"
            name="state"
            options={categories}
            className="form-control form-control-sm"
          />
          <Field
            type="text"
            label="Klub"
            name="club"
            className="form-control form-control-sm"
          />
          <Field
            type="text"
            label="Email"
            name="email"
            placeholder="@"
            className="form-control form-control-sm"
          />
          <Field
            type="text"
            label="Telefon"
            name="phone"
            className="form-control form-control-sm"
          />
          {/*<p>
            <strong>
              Platbu štartovného možno nahradiť poukázaním 2% daní minimálne vo
              výške štartovného na bežecký klub. Jedno poukázanie 2% daní je
              možné použiť len na jedného pretekára. Nutné uviesť v prihláške
              (poznámky) a preukázať potvrdením Daňového úradu zaslaním na mail:
              bohunek.zdenek@maratonfurca.sk alebo pri prezentácii.{" "}
            </strong>
          </p>*/}
          <Field
            component="textarea"
            label="Poznamka"
            name="message"
            rows="4"
          />
          <div className="confirm-text-wrapper margin-bottom">
          <Field
            component="checkbox"
            name="agree"
            text={confirmText}
          />
          </div>
          <button
            type="submit"
            className="btn btn-primary float-right"
            label="Submit"
          >
            <FontAwesome name="check-square-o" /> Odoslat prihlasku
          </button>
          <br />
        </Form>
      </SidebarLayout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    resourceBaseUrl: state.resourceBaseUrl
  };
};

export default connect(mapStateToProps, null)(Registration);
