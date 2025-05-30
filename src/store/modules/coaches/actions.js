

export default {
  async registerCoach(context, data) {
    const userId = context.rootState.userId
    const coachData = {
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };
    const response = await fetch(`https://vue-coach-project-7f712-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
      method: 'PUT',
      body: JSON.stringify(coachData)
    });

    if (response.ok) {
      // const responseData = await response.json();
      context.commit('registerCoach', {
        ...coachData,
        id: userId,
      });

    }
    else{
      //error
    }
  },
  async loadCoaches(context) {
    const response = await fetch(`https://vue-coach-project-7f712-default-rtdb.firebaseio.com/coaches.json`)
    const responseData = await response.json();
    // console.log(responseData);

    if (!response.ok) {
      //error for later
    }

    const coaches = [];

    for (const key in responseData) {
      console.log(key)
      console.log(responseData[key])
      const coachData = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas,
      };
      console.log(coachData);

      coaches.push(coachData);
    }

    context.commit('setCoaches', coaches);
  },
};