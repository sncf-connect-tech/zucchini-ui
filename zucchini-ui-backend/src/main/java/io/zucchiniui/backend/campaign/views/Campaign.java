package io.zucchiniui.backend.campaign.views;

public class Campaign {

    /**
     * Name of the campaign.
     */
    private String name;

    /**
     * Number of associated testRuns.
     */
    private Integer testRuns;

    public Campaign(String name, Integer testRuns) {
        this.name = name;
        this.testRuns = testRuns;
    }

    public Integer getTestRuns() {
        return testRuns;
    }

    public void setTestRuns(Integer testRuns) {
        this.testRuns = testRuns;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
