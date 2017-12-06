import React from 'react';
import {Page, Toolbar} from 'react-onsenui';
import 'css/style.css';

export default class InfoPage extends React.Component {
  render() {
    return (
      <Page
        renderToolbar={() =>
          <Toolbar>
            <div className='center'>Info.</div>
          </Toolbar>
        }
      >
        <div style={{padding:"1em"}}>
          <div>
              <h2>Disclaimer</h2>
              <p className="briefDescription">
                  This app intends to visualize our limited life time in a graphical way thus we could have understand the value of time.
                  The estimation of assumed week of death is based on average life expectancy and life style of particular demographic region.
                  This estimation may not accurate but may have positive psychological impact.

                  We disclaim to the issue that hurts anybody unintentionally. We also ensure the privacy of your personal information that it would not be exposed publicly or handover to third party.
              </p>
              <br/>
              <h2>Brief Description</h2>
              <p className="briefDescription">
                  Getting 100 years (5200 weeks) of age is not so common. A few of us could reach to this age level. The maximum average level of age is more or less 75 years.
                  Getting higher age level depends on many factors including food habit, exercise, environment condition and life style.
                  But it is necessary to use our time effectively. In this app you may see a matrix of 100x52 blocks where each row is 1 year and each block is 1 week.
                  1 year consists 52 weeks. So in 100 years a person may get 5200 weeks. 1st red block is our birthday and the black blocks are those weeks which have been passed.
                  We never get those passed weeks. So we should look forward. White blocks refers to the weeks which we may get to enjoy if all things remain normal in our life.
                  The brown blocks indicates which you may not get. But our health awareness and good luck help us to get those weeks. The off white with 'x' blocks refers the weeks which would be most possible weeks of death.
                  This prediction of weeks of death may not accurate but have nearest value of our death time. The probability strength depends on the statistics of particular region, your health condition and life style.
              </p>
          </div>
        </div>
      </Page>
    );
  }
}