package io.zucchiniui.backend.campaign.views;

/**
 * All scenarios stats for a given test run.
 */
public class CampaignTestRunScenariosStats {

    /**
     * Total number of scenarios for the test run.
     */
    private Integer all;

    /**
     * Number of failed scenarios.
     */
    private Integer failed;

    /**
     * Number of scenarios to review.
     */
    private Integer toReview;

    /**
     * Number of scenarios to review when test run was imported.
     */
    private Integer toReviewAtImport;

    public CampaignTestRunScenariosStats(Integer all, Integer failed, Integer toReview, Integer toReviewAtImport) {
        this.all = all;
        this.failed = failed;
        this.toReview = toReview;
        this.toReviewAtImport = toReviewAtImport;
    }

    public Integer getAll() {
        return all;
    }

    public void setAll(Integer all) {
        this.all = all;
    }

    public Integer getFailed() {
        return failed;
    }

    public void setFailed(Integer failed) {
        this.failed = failed;
    }

    public Integer getToReview() {
        return toReview;
    }

    public void setToReview(Integer toReview) {
        this.toReview = toReview;
    }

    public Integer getToReviewAtImport() {
        return toReviewAtImport;
    }

    public void setToReviewAtImport(Integer toReviewAtImport) {
        this.toReviewAtImport = toReviewAtImport;
    }

    public static class Builder {
        private Integer all;
        private Integer failed;
        private Integer toReview;
        private Integer toReviewAtImport;

        public Builder withAll(Integer all) {
            this.all = all;
            return this;
        }

        public Builder withFailed(Integer failed) {
            this.failed = failed;
            return this;
        }

        public Builder withToReview(Integer toReview) {
            this.toReview = toReview;
            return this;
        }

        public Builder withToReviewAtImport(Integer toReviewAtImport) {
            this.toReviewAtImport = toReviewAtImport;
            return this;
        }

        public CampaignTestRunScenariosStats build() {
            return new CampaignTestRunScenariosStats(all, failed, toReview, toReviewAtImport);
        }
    }
}
