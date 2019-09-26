package io.zucchiniui.backend.scenario.domain;

public enum ScenarioStatus {

    NOT_RUN("unplayed"),
    PASSED,
    FAILED("failures"),
    PENDING("pending");

    private String status;

    ScenarioStatus() {

    }

    private ScenarioStatus(String status) {
        this.status = status;
    }

    /**
     * @return the status
     */
    public String getStatus() {
        return status;
    }

    /**
     * @param status
     *            the status to set
     */
    public void setStatus(String status) {
        this.status = status;
    }

    public static ScenarioStatus getScenarioByStatus(String status) {
        for (int i = 0; i < ScenarioStatus.values().length; i++) {
            if (status.equals(ScenarioStatus.values()[i].status))
                return ScenarioStatus.values()[i];
        }
        return null;
    }
}
