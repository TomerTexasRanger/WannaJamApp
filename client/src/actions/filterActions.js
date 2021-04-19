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
    if (age === 'a') {
      return profile.age >= 18 && profile.age <= 30;
    } else if (age === 'b') {
      return profile.age >= 30 && profile.age <= 50;
    } else if (age === 'c') {
      return profile.age >= 50;
    } else {
      return profile;
    }
  });
  console.log(filterProfiles);
  return filterProfiles;
};

//Filter by region
export const filterByRegion = (region, profiles) => {
  const filterProfiles = profiles.filter((profile) => {
    if (region === 'north') {
      return profile.region === 'north';
    } else if (region === 'center') {
      return profile.region === 'center';
    } else if (region === 'south') {
      return profile.region === 'south';
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
