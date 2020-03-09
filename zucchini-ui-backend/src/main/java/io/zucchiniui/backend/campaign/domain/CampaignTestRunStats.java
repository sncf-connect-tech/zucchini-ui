package io.zucchiniui.backend.campaign.domain;

/**
 * Stats for a given test run associated to a campaign.
 */
public class CampaignTestRunStats {

    /**
     * Type of test run.
     */
    private String type;

    /**
     * Stats for all test run scenarios.
     */
    private ScenariosStats scenarios;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public ScenariosStats getScenarios() {
        return scenarios;
    }

    public void setScenarios(ScenariosStats scenarios) {
        this.scenarios = scenarios;
    }

    /**
     * All scenarios stats for a given test run.
     */
    public static class ScenariosStats {

        /**
         * Total number of scenarios for the test run.
         */
        private Integer all;

        /**
         * Failed scenarios stats.
         */
        private FailedScenariosStats failed;

        public ScenariosStats(Integer all, FailedScenariosStats failedScenariosStats) {
            this.all = all;
            this.failed = failedScenariosStats;
        }

        public Integer getAll() {
            return all;
        }

        public void setAll(Integer all) {
            this.all = all;
        }

        public FailedScenariosStats getFailed() {
            return failed;
        }

        public void setFailed(FailedScenariosStats failed) {
            this.failed = failed;
        }

        /**
         * Failed scenarios analysis.
         */
        public static class FailedScenariosStats {

            /**
             * Total number of failed scenarios for the test run.
             */
            private Integer total;

            private Integer toReviewAtImport;

            private Integer reviewed;

            public FailedScenariosStats(Integer total, Integer toReviewAtImport, Integer reviewed) {
                this.total = total;
                this.toReviewAtImport = toReviewAtImport;
                this.reviewed = reviewed;
            }

            public Integer getToReviewAtImport() {
                return toReviewAtImport;
            }

            public void setToReviewAtImport(Integer toReviewAtImport) {
                this.toReviewAtImport = toReviewAtImport;
            }

            public Integer getReviewed() {
                return reviewed;
            }

            public void setReviewed(Integer reviewed) {
                this.reviewed = reviewed;
            }

            public Integer getTotal() {
                return total;
            }

            public void setTotal(Integer total) {
                this.total = total;
            }

            public static class Builder {
                private Integer total;
                private Integer toReviewAtImport;
                private Integer reviewed;

                public Builder withTotal(Integer failed) {
                    this.total = failed;
                    return this;
                }

                public Builder withToReviewAtImport(Integer toReviewAtImport) {
                    this.toReviewAtImport = toReviewAtImport;
                    return this;
                }

                public Builder withReviewed(Integer reviewed) {
                    this.reviewed = reviewed;
                    return this;
                }

                public ScenariosStats.FailedScenariosStats build() {
                    return new ScenariosStats.FailedScenariosStats(total, toReviewAtImport, reviewed);
                }
            }
        }

    }
}
