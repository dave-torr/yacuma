export function extractUser(req) {
  if (!req.user) return null;
  // take only needed user fields to avoid sensitive ones (such as password)
  const {
    name, email, profileData, clientType, contactInfo, resArray, company 
  } = req.user;
  return {
    name, email, profileData, clientType, contactInfo, resArray, company 
  };
};

