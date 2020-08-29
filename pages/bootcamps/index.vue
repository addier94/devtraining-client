<template>
    <!-- Latest bootcamps -->
  <section class="browse my-5">
    <div class="container">
      <div class="row">
        <!-- Sidebar -->
        <div class="col-md-4">
          <div class="card card-body mb-4">
            <h4 class="mb-3">By Location</h4>
            <form>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      name="miles"
                      placeholder="Miles From"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <input
                      type="text"
                      class="form-control"
                      name="zipcode"
                      placeholder="Enter Zipcode"
                    />
                  </div>
                </div>
              </div>
              <input
                type="submit"
                value="Find Bootcamps"
                class="btn btn-primary btn-block"
              />
            </form>
          </div>

          <h4>Filter</h4>
          <form>
            <div class="form-group">
              <label> Career</label>
              <select class="custom-select mb-2">
                <option value="any" selected>Any</option>
                <option value="Web Development">Web Development</option>
                <option value="Mobile Development">Mobile Development</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Data Science">Data Science</option>
                <option value="Business">Business</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div class="form-group">
              <label> Rating</label>
              <select class="custom-select mb-2">
                <option value="any" selected>Any</option>
                <option value="9">9+</option>
                <option value="8">8+</option>
                <option value="7">7+</option>
                <option value="6">6+</option>
                <option value="5">5+</option>
                <option value="4">4+</option>
                <option value="3">3+</option>
                <option value="2">2+</option>
              </select>
            </div>

            <div class="form-group">
              <label> Budget</label>
              <select class="custom-select mb-2">
                <option value="any" selected>Any</option>
                <option value="20000">$20,000</option>
                <option value="15000">$15,000</option>
                <option value="10000">$10,000</option>
                <option value="8000">$8,000</option>
                <option value="6000">$6,000</option>
                <option value="4000">$4,000</option>
                <option value="2000">$2,000</option>
              </select>
            </div>
            <input
              type="submit"
              value="Encontrar Bootcamps"
              class="btn btn-primary btn-block"
            />
          </form>
        </div>
        <!-- Main col -->
        <div class="col-md-8">
          <!-- Bootcamps -->
          <div v-for="bootcamp in bootcamps" :key="bootcamp._id" class="card mb-3">
            <bootcamps-item-block :bootcamp="bootcamp" />
          </div>

          <!-- Pagination -->
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#">Previous</a>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import InlineErrorBlock from '@/components/blocks/InlineErrorBlock'
import BootcampsItemBlock from '@/components/blocks/BootcampsItemBlock'
export default {
  components: {
    InlineErrorBlock,
    BootcampsItemBlock
  },
  async fetch() {
    const bootcamps = await fetch(`http://localhost:5000/api/v1/bootcamps`)
      .then((res) => res.json())

      this.bootcamps = this.bootcamps.concat(bootcamps.data)
  },
  data() {
    return {
      currentPage: 1,
      bootcamps: []
    }
  },
  methods: {
    lazyLoadArticles(isVisible) {
      if (isVisible) {
        if (this.currentPage < 5) {
          this.currentPage ++
          this.$fetch()
        }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/templatecss/bootstrap.css";
</style>