function getUserUrlsData(userData, urlsData) {
  userData.visitCount = Number(userData.visitCount)
  userData.shortenedUrls = urlsData

  return userData
}

export const formatData = {
  getUserUrlsData,
}
