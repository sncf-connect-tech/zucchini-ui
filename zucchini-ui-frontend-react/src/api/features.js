import Client from './Client';


class FeaturesApi {

  constructor(baseUri) {
    this.client = new Client(`${baseUri}/api/features`);
  }

  getFeature({ featureId }) {
    return this.client.get({ path: featureId });
  }

  getFeatures({ testRunId, withStats }) {
    return this.client.get({
      query: {
        testRunId,
        withStats,
      },
    });
  }

  getFeatureHistory({ featureId }) {
    return this.client.get({ path: `${featureId}/history` });
  }

  deleteFeature({ featureId }) {
    return this.client.delete({
      path: `${featureId}/history`,
      hasOutput: false,
    });
  }

}

const features = new FeaturesApi(configuration.ui.backendBaseUri);

export default features;
