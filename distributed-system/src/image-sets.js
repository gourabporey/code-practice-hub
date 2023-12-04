const JobStatus = require('./job-status');

class ImageSets {
  #id;
  #imageSets;

  constructor() {
    this.#id = 0;
    this.#imageSets = {};
  }

  addImageSet(imageSet) {
    const jobToSchedule = Object.assign({ id: this.#id }, imageSet);
    this.#imageSets[this.#id] = Object.assign({}, jobToSchedule);
    this.#imageSets[this.#id].status = JobStatus.RECEIVED;
    this.#imageSets[this.#id].scheduledAt = new Date();
    this.#id++;

    return jobToSchedule;
  }

  get(id) {
    return Object.assign({}, this.#imageSets[id]);
  }

  completeProcessing(id, tags) {
    this.#imageSets[id].tags = tags;
    this.#imageSets[id].status = JobStatus.COMPLETED;
  }
}

module.exports = ImageSets;
