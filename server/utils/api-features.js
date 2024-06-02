const getFilterQuery = (queryString) => {
  let filerQuery = { ...queryString }
  let excludedQueriesForFilters = ['page', 'limit', 'sort', 'fields']
  excludedQueriesForFilters.forEach((el) => delete filerQuery[el])

  let filterStr = JSON.stringify(filerQuery)
  filterStr = filterStr.replace(/\b(lt|lte|gt|gte)\b/g, (match) => `$${match}`)
  return filterStr
}

class ApiFeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }
  //   Filters
  filter() {
    let filterStr = getFilterQuery(this.queryString)

    this.query = this.query.find(JSON.parse(filterStr))
    return this
  }
  //   Sorting

  sort() {
    if (this.queryString.sort) {
      let sortBy = this.queryString.sort.replaceAll(',', ' ')
      this.query = this.query.sort(sortBy)
    } else this.query = this.query.sort('-createdAt')

    return this
  }

  //   Limit Fields

  limitFields() {
    if (this.queryString.fields) {
      let fieldsLimit = this.queryString.fields.replaceAll(',', ' ')
      this.query = this.query.select(fieldsLimit)
    } else this.query = this.query.select('-__v')

    return this
  }
  //   Pagination

  paginate() {
    let page = +this.queryString?.page || 1
    let limit = +this.queryString?.limit || 100
    let skip = (page - 1) * limit || 0

    this.query = this.query.skip(skip).limit(limit)

    return this
  }
}

module.exports = { ApiFeatures: ApiFeatures, getFilterQuery: getFilterQuery }
