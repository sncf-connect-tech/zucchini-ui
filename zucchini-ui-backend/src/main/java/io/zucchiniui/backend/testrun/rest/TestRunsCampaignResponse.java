package io.zucchiniui.backend.testrun.rest;

import io.zucchiniui.backend.campaign.views.CampaignTestRun;

import java.util.List;

public class TestRunsCampaignResponse {

    private String campaign;

    private List<CampaignTestRun> testRuns;

    public TestRunsCampaignResponse(String campaign, List<CampaignTestRun> testRuns) {
        this.campaign = campaign;
        this.testRuns = testRuns;
    }

    public String getCampaign() {
        return campaign;
    }

    public void setCampaign(String campaign) {
        this.campaign = campaign;
    }

    public List<CampaignTestRun> getTestRuns() {
        return testRuns;
    }

    public void setTestRuns(List<CampaignTestRun> testRuns) {
        this.testRuns = testRuns;
    }
}
