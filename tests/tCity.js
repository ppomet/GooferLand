/*
testCity = () => {
  console.log();
  console.log('---<> debut de la batterie de tests de la classe City <>---');
  console.log();
  let myFact = new RandFactory(6, 2);
  let myCity = new City(5, 5, 2, "testCity");

  console.log(`${JSON.stringify(this)}`);
  myCity.addGooferCitizen(myFact.createGoofer(myCity.eventHandler));
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      // console.log(myCity);
      myHF.coloredMsg(`y'a t'il un goofer sur la case [${x}][${y}] ${myCity.doesCellHaveAGoofer(x, y)}`, 'blue');
    }
  }
  // myCity.doesCellHaveAGoofer();

  console.log();
  console.log('---<> fin de la batterie de tests de la classe City <>---');
  console.log();
}
testListeners = (iterations) => {
  iterations = secureIterationsNumber(iterations) * 2;
  console.log();
  Listdebug('---<> Debut de la batterie de tests des listeners <>---');
  console.log();

  let myScreamingCity = new City(4, 4, 2, 'The Screeeaming City');
  myScreamingCity.launchTimeFlow(4500);
  let myfact = new RandFactory(6,3, true);
  let testgoof = myfact.createGoofer(myScreamingCity.eventHandler);
  myScreamingCity.addGooferCitizen(testgoof);
  myScreamingCity.addGooferCitizen([myfact.createGoofer(myScreamingCity.eventHandler), myfact.createGoofer(myScreamingCity.eventHandler)]);
  // myScreamingCity.addGooferCitizen(null);
  // myScreamingCity.addGooferCitizen();
  setTimeout(()=> {
    console.log(`...`);
    testgoof.lifeCycle();
    Listdebug({EVENT: myScreamingCity.eventHandler});
  }, 4000);

  console.log();
  Listdebug('---<> Fin de la batterie de tests des listeners <>---');
  console.log();
}
*/
