// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

// const axios = require('axios').default;
import axios from 'axios'

export default function initUsersController() {
const index = async (req, res)=>{
       console.log('searching for users')


  const {query}= req.params
// make a get request to the github search api
  axios.get(`https://api.github.com/search/users?q=${query}+in:login&page=1&per_page=50`, {
      userAgent: 'githubQueryApp',
    })
    .then(({data}) => {
      // console.log(data)
      console.log(data)

      // handle results from github search api
      const dataForClient=[]
      data.items.forEach(datum => {
        dataForClient.push({
          // the keys (i.e. title and linkToSite are used to render the drop-down suggestions. To note when modifying
          id: datum.id,
          avatar: datum.avatar_url,
          title: datum.login,
          linkToSite: datum.html_url,
          numFollowers: datum.followers_url.length
        })
      });
      console.log(dataForClient)
      // send results to FE
      res.send(dataForClient)
    })
    .catch((err) => console.log(err));
}

  return {
    index
  };
}
