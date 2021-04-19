import axios from 'axios'

export default function initReposController() {
  /**
   * Function to return all the listings present in database
   * It also returns the list of unique categories
   */
   const index = async (req, res)=>{
     console.log('searching for repo')

  const {query}= req.params
  console.log(`query in repos.mjs:`)
  console.log(query)
// make a get request to the github search api
  axios.get(`https://api.github.com/search/repositories?q=${query}+in:login&page=1&per_page=50`, {
      userAgent: 'githubQueryApp',
    })
    .then(({data}) => {
      // handle results from github search api
      console.log(`data in repos.mjs`)
      console.log(data)
      const dataForClient=[]
      data.items.forEach(datum => {

        const userName= datum.full_name.split('/')[0]
        console.log(`userName is:`)
        console.log(userName)

        dataForClient.push({
          // the keys (i.e. title and linkToSite are used to render the drop-down suggestions. To note when modifying
          id: datum.id,
          title: datum.name,
          userName: userName,
          linkToSite: datum.html_url,
          numDownloads: datum.downloads_url.length,
          numStargazers: datum.stargazers_count,
          updatedDate: datum.updated_at,
          language: datum.language
        })
      });
      console.log(dataForClient)
      // send results to FE
      res.send(dataForClient)
    })
    .catch((err) => console.log(err));
}


  return {
    index,
  };
}
