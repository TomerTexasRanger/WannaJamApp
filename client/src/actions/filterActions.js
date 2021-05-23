// Filter Profiles by name
export const filterByName = (data, profiles) => {
  console.log('Filter on');

  const filterProfiles = profiles.filter((profile) => {
    return profile.userName.toLowerCase().includes(data.toLowerCase());
  });
  console.log(filterProfiles);
  return filterProfiles;
};

//Filter profiles by age
export const filterByAge = (age, profiles) => {
  console.log(profiles);
  const filterProfiles = profiles.filter((profile) => {
    if (age === '18-30') {
      return profile.age >= 18 && profile.age <= 30;
    } else if (age === '30-50') {
      return profile.age >= 30 && profile.age <= 50;
    } else if (age === '50+') {
      return profile.age >= 50;
    } else {
      return profile;
    }
  });
  console.log(filterProfiles);
  return filterProfiles;
};

//Filter Profiles by region
export const filterByRegion = (region, profiles) => {
  const filterProfiles = profiles.filter((profile) => {
    if (region === 'North') {
      return profile.region === 'North';
    } else if (region === 'Center') {
      return profile.region === 'Center';
    } else if (region === 'South') {
      return profile.region === 'South';
    } else {
      return profile;
    }
  });
  console.log(filterProfiles);
  return filterProfiles;
};

//Filter by instrument
export const filterByInstrument = (instrument, profiles) => {
  const filterProfiles = profiles.filter((profile) => {
    return (
      profile.skills.filter(
        (skill) => skill.instrument.toLowerCase() === instrument.toLowerCase()
      ).length > 0
    );
  });
  console.log(filterProfiles);
  return filterProfiles;
};

//Filter Posts by profile name
export const filterPostsByName = (data, posts) => {
  const filterPosts = posts.filter((post) => {
    return post.userName.toLowerCase().split(' ').includes(data.toLowerCase());
  });
  console.log(filterPosts);
  return filterPosts;
};

//Filter posts by instrument
export const filterPostsByInstrument = (instrument, posts) => {
  const filterPosts = posts.filter((post) => {
    return post.headline
      .toLowerCase()
      .split(' ')
      .includes(instrument.toLowerCase());
  });
  return filterPosts;
};

//Filter posts by region
export const filterPostsByRegion = (region, posts) => {
  const filterPosts = posts.filter((post) => {
    if (region === 'North') {
      return post.region === 'North';
    } else if (region === 'Center') {
      return post.region === 'Center';
    } else if (region === 'South') {
      return post.region === 'South';
    } else {
      return post;
    }
  });
  return filterPosts;
};

//Filter posts by fee
export const filterPostsByFee = (paid, posts) => {
  const filterPosts = posts.filter((post) => {
    if (post.paid === true) {
      return post.paid === true;
    } else {
      return post.paid === false;
    }
  });
  return filterPosts;
};
