/* Erik Safford
   Assignment 3 - Functional Programming & Underscore
   CS 320
   September 2018  */

// 1. totalDegrees(data): This function is passed a data structure like wsudgrs and returns the total number of degrees awarded in the data set.

var degreesTotal = totalDegrees(wsudgrs);
console.log("The total number of degrees awarded is: "+degreesTotal);

function totalDegrees(data) {
  var numList = _.pluck(data,'AWARDS');  //Pluck all AWARDS values from the data set
  var totalAwarded = _.reduce(numList,function(memo,num){return(memo+num)}); //Add all AWARDS to one value
  return(totalAwarded);
}

// 2. percentagePhD(data): This function is passed a data structure like wsudgrs and returns the percentage of degrees that were awarded to PhD students. Such students are indicated by the string "Doctoral" in the "Level" field.

var percentPhD = percentagePhD(wsudgrs);

function percentagePhD(data) {
  var itemList = _.groupBy(data,'Level'); //Group the data set by 'Level' catagory
  var doctoralList = _.pluck(itemList.Doctoral,'AWARDS'); //Pluck AWARDS values from the data sets w/ 'Level' = "Doctoral"
  var totalDoctoralAwarded = _.reduce(doctoralList,function(memo,num){return(memo+num)}); //Add all Doctoral AWARDS to one value

  var totalAwarded = totalDegrees(data);  //Find total number of awards for all students

  var percentPhD = (totalDoctoralAwarded / totalAwarded);
  percentPhD = Math.round(percentPhD * 10000) / 10000; //Round to 5 decimal spaces
  var percentPhD1 = percentPhD * 100;
  percentPhD1 = Math.round(percentPhD1 * 100) / 100; //Round to 3 decimal spaces

  console.log("Percentage of degrees awarded to PhD students: "+totalDoctoralAwarded+" / "+totalAwarded+" = "+percentPhD+" or "+percentPhD1+"%");
  return(percentPhD);
}

// 3. totalDegreesByYear(data, year): This function can be passed wsudgrs and a year and returns the total number of degrees awarded in that year.

var totalYearDegrees = totalDegreesByYear(wsudgrs,2008);

function totalDegreesByYear(data,year) {
  var yearList = _.groupBy(data,'FISCAL_YEAR'); //Group the data set by 'FISCAL_YEAR' catagory
  var selectedYearList = _.pluck(yearList[year],'AWARDS'); //Pluck the AWARDS data from the specified year of the yearList
  var totalSelectedYear = _.reduce(selectedYearList,function(memo,num){return memo+num});  //Add all the AWARDS from the specified year
  console.log("The total number of degrees awarded in "+year+" is: "+totalSelectedYear);
  return(totalSelectedYear);
}

// 4. listCampuses(data): This function can be passed wsudgrs and returns an array containing all the campuses referenced in the dataset.

var campusesReferenced = listCampuses(wsudgrs);
console.log("The campuses referenced in the dataset are: "+campusesReferenced);

function listCampuses(data) {
  var campusList = _.pluck(data,'CAMPUS');  //Pluck the CAMPUS data from all items in data
  var uniqueCampusList = _.uniq(campusList); //Remove duplicates
  return(uniqueCampusList);
}

// 5. listCampusDegrees(data): This function can be passed wsudgrs and returns an object where the property keys are campuses and the values are the number of degrees awarded by the campus.

var campusDegrees = listCampusDegrees(wsudgrs);
console.log(campusDegrees);

function listCampusDegrees(data) {
  var campusList = _.groupBy(data,'CAMPUS'); //Group the data set by CAMPUS

  var PullmanDegrees = _.pluck(campusList.Pullman,'AWARDS'); //Pluck the AWARDS values for data sets w/ type 'Pullman'
  var totalPullmanDegrees = _.reduce(PullmanDegrees,function(memo,num){return memo+num;}); //Add AWARDS together

  var SpokaneDegrees = _.pluck(campusList.Spokane,'AWARDS');
  var totalSpokaneDegrees = _.reduce(SpokaneDegrees,function(memo,num){return memo+num;});

  var TriCitiesDegrees = _.pluck(campusList['Tri-Cities'],'AWARDS'); //Brackets to access 'Tri-Cities'
  var totalTriCitiesDegrees = _.reduce(TriCitiesDegrees,function(memo,num){return memo+num;});

  var VancouverDegrees = _.pluck(campusList.Vancouver,'AWARDS');
  var totalVancouverDegrees = _.reduce(VancouverDegrees,function(memo,num){return memo+num;});

  var WSUOnlineDegrees = _.pluck(campusList['WSU Online'],'AWARDS'); //Brackets to access 'WSU Online'
  var totalWSUOnlineDegrees = _.reduce(WSUOnlineDegrees,function(memo,num){return memo+num;});

  var EverrettDegrees = _.pluck(campusList.Everrett,'AWARDS');
  var totalEverrettDegrees = _.reduce(EverrettDegrees,function(memo,num){return(memo+num);});

  return {Pullman:totalPullmanDegrees,Spokane:totalSpokaneDegrees,TriCities:totalTriCitiesDegrees,Vancouver:totalVancouverDegrees,WSUOnline:totalWSUOnlineDegrees,Everrett:totalEverrettDegrees};

}

// 6. maxDegrees(data): This function can be passed wsudgrs, computes the number of degrees earned in each year in the dataset, and then returns an integer which is the number of degrees earned in the year where the most degrees were earned.

var maxDegreesEarned = maxDegrees(wsudgrs);
console.log("The total degrees earned, in the year where the most degrees were earned, is: "+maxDegreesEarned);

function maxDegrees(data) {
  var totalList = []; //Make an array to hold the total degrees earned for each year

  var years = _.uniq(_.pluck(data,"FISCAL_YEAR")); //Make array that contains all years in dataset

  _.each(years,function(year){ var listItem = totalDegreesByYear(data,year);
    totalList.push(listItem);});

  var listMaxAward = _.max(totalList,function(total){return total;}); //Find the MAX value in the totalList
  return(listMaxAward); //Return highest yearly total number of degrees
}




