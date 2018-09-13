import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: '0',
      output: null,
      rate: '0',
      term: '15'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newBalance = parseFloat(this.state.balance);
    const newRate = parseFloat(this.state.rate / 100 / 12);
    const newTerm = parseInt(this.state.term, 10) * 12;
    const monthlyPayment = newBalance * (newRate * ((1 + newRate) ** newTerm)) / (((1 + newRate) ** newTerm) - 1);
    this.setState({
      output: `$${Math.ceil(monthlyPayment * 100) / 100} is your payment!`
    });
  }

  render() {
    return (
      <div className='container'>
        <h3>Mortgage Calculator</h3>
        <form className='form-horizontal'>
          <div className='form-group'>
            <label htmlFor='loan-balance' className='col-sm-2 control-label'>
            Loan Balance
            </label>
            <div className='col-sm-10'>
              <input
                type='number'
                className='form-control'
                name='balance'
                value={ this.state.balance }
                onChange={ this.handleChange }
              />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='interest-rate' className='col-sm-2 control-label'>
            Interest Rate (%)
            </label>
            <div className='col-sm-10'>
              <input
                className='form-control'
                name='rate'
                type='number'
                step='0.01'
                value={ this.state.rate }
                onChange={ this.handleChange }
              />
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='loan-terms' className='col-sm-2 control-label'>
            Loan Term (years)
            </label>
            <div className='col-sm-10'>
              <select
                className='form-control'
                name='term'
                onChange={ this.handleChange }
              >
                <option value='15'>15</option>
                <option value='30'>30</option>
              </select>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button
                name='submit'
                className='btn btn-default'
                onClick={ this.handleSubmit }
              >
              Calculate
              </button>
            </div>
          </div>
          <div
            className='form-group'
            id='output'
            name='output'
            value={ this.state.output }
          >
            <h3>{this.state.output}</h3>
          </div>
        </form>
      </div>
    );
  }
}
