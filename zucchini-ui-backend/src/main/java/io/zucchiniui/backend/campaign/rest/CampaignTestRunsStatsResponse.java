package io.zucchiniui.backend.campaign.rest;

import io.zucchiniui.backend.campaign.domain.CampaignTestRunStats;

import java.util.List;

public class CampaignTestRunsStatsResponse {

    private String campaign;

    private List<CampaignTestRunStats> testRuns;
    public CampaignTestRunsStatsResponse(String campaign, List<CampaignTestRunStats> testRuns) {
        this.campaign = campaign;
        this.testRuns = testRuns;
    }

    public String getCampaign() {
        return campaign;
    }

    public void setCampaign(String campaign) {
        this.campaign = campaign;
    }

    public List<CampaignTestRunStats> getTestRuns() {
        return testRuns;
    }

    public void setTestRuns(List<CampaignTestRunStats> testRuns) {
        this.testRuns = testRuns;
    }
}
