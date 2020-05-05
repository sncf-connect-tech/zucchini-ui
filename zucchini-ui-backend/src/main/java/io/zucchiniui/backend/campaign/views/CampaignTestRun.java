package io.zucchiniui.backend.campaign.views;

/**
 * Stats for a given test run associated to a campaign.
 */
public class CampaignTestRun {

    /**
     * Test run ID.
     */
    private String id;

    /**
     * Type of test run.
     */
    private String type;

    /**
     * Stats for all test run scenarios.
     */
    private CampaignTestRunScenariosStats scenarios;

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

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
