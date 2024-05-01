export type JobInterface = {
    jdUid: string;
    jdLink: string;
    jobDetailsFromCompany: string;
    maxJdSalary: number;
    minJdSalary: number | null;
    salaryCurrencyCode: string;
    location: string;
    minExp: number;
    maxExp: number;
    jobRole: string;
}

export type JobList = {
    jdList: JobInterface[]
    totalCount: number
}


export const fetchJobResolver = async (limit: number, offset: number): Promise<JobList> => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "limit": limit,
        "offset": offset
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON',
        requestOptions);

    const data = await response.json();
    return data;
};










// // {
//   "jdList": [
//     {
//       "jdUid": "cfff35ac-053c-11ef-83d3-06301d0a7178-92010",
//       "jdLink": "https://weekday.works",
//       "jobDetailsFromCompany": "This is a sample job and you must have displayed it to understand that its not just some random lorem ipsum text but something which was manually written. Oh well, if random text is what you were looking for then here it is: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages and now in this assignment.",
//       "maxJdSalary": 61,
//       "minJdSalary": null,
//       "salaryCurrencyCode": "USD",
//       "location": "delhi ncr",
//       "minExp": 3,
//       "maxExp": 6,
//       "jobRole": "frontend"
//     }
//   ],
//   "totalCount": 11657
// }