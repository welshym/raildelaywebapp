const rootUrl = 'http://localhost:3000/delays';
import request from 'superagent/lib/client';

const DelaysAPI = {
  getDelayData: (departureStation, arrivalStation, fromDate, toDate) => {
 /*   let sampleDelay = {
      departureDetails: {
        crs: 'PTR',
        fullName: 'Petersfield',
        scheduledTimestamp: '2018-03-02T06:48:00.000Z',
        actualTimestamp: '2018-03-02T06:59:00.000Z'
      },
      arrivalDetails: {
        crs: 'WAT',
        fullName: 'Waterloo',
        scheduledTimestamp: '2018-03-02T07:54:00.000Z',
        actualTimestamp: '2018-03-02T08:59:00.000Z'
      },
      trainId: 'SW815900',
      delayInSeconds: '65',
      delayDate: '2018-02-03',
    };*/

    console.log('DelaysAPI: departureStation, arrivalStation, fromDate, toDate', departureStation, arrivalStation, fromDate, toDate);
    let fromDateObject = new Date(fromDate);
    let fromDateStr = fromDateObject.getFullYear() + '-' + String( Number( fromDateObject.getMonth() ) + 1 ) + '-' + fromDateObject.getDate();
    console.log('fromDateStr: ', fromDateStr);

    let toDateObject = new Date(toDate);
    let toDateStr = toDateObject.getFullYear() + '-' + String( Number( toDateObject.getMonth() ) + 1 ) + '-' + toDateObject.getDate();
    console.log('toDateStr: ', toDateStr);

    return new Promise((resolve, reject) => {
      request
        .get(rootUrl + '/' + fromDateStr + '/' + toDateStr)
        .end((err, response) => {
          if (err) reject(err);
          resolve(JSON.parse(response.text));
        });
    });
  }
};

export default DelaysAPI;
