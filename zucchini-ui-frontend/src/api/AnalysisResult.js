import Client from "./Client";

class AnalysisResult {
  constructor() {
    this.client = new Client("/api/analysis");
  }

  getAnalysisTags() {
    return this.client.get();
  }
}

const analysisResult = new AnalysisResult();

export default analysisResult;
