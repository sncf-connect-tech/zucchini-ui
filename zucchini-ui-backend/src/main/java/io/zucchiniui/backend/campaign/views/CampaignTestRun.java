package io.zucchiniui.backend.campaign.views;

/**
 * Stats for a given test run associated to a campaign.
 */
public class CampaignTestRun {

    /**
     * Type of test run.
     */
    private String type;

    /**
     * Stats for all test run scenarios.
     */
    private CampaignTestRunScenariosStats scenarios;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public CampaignTestRunScenariosStats getScenarios() {
        return scenarios;
    }

    public void setScenarios(CampaignTestRunScenariosStats scenarios) {
        this.scenarios = scenarios;
    }

}
