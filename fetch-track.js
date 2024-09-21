async function fetchTrainData(date) {
  const res = await fetch("https://www.amtrak.com/dotcom/travel-service/statuses/281?service-date=" + date, {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-amtrak-trace-id": "e314a8454dd41443be498e744c9e6e5b25401726420236489",
      "Referer": "https://www.amtrak.com/home.html",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });
  const body = await res.text();
  console.log(body);
  if (!res.ok) {
    console.log("ERROR");
    return null;
  }
  return await JSON.parse(body);
}

async function fetchTodayTrainData() {
  const now = new Date();
  const today = now.toISOString().split("T")[0];
  return await fetchTrainData(today);
}
export function parseTrainData(json) {
  for (let stop of json["data"][0]["stops"]) {
    if (stop["station"]["code"] === "NYP") {
      if ("track" in stop["departure"]) {
        return Number(stop.departure.track.number);
      }
    }
  }
}
console.log(parseTrainData(await fetchTodayTrainData()));

/*
module.exports = {
  parseTrainData,
};
*/