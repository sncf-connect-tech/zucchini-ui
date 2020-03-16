package io.zucchiniui.backend.scenario.domain;

import io.zucchiniui.backend.shared.domain.BasicInfo;

import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class ScenarioPredictionRequest {

    private String id;

    private ScenarioStatus status;

    private String scenarioKey;

    private Set<String> tags = new HashSet<>();

    private Set<String> allTags = new HashSet<>();

    private List<Step> steps;

    private ZonedDateTime createdAt;

    private BasicInfo info;

    private String testRunId;

    public ScenarioPredictionRequest(Scenario scenario) {
        id= scenario.getId();
        status= scenario.getStatus();
        scenarioKey= scenario.getScenarioKey();
        tags= scenario.getTags();
        allTags= scenario.getAllTags();
        steps= scenario.getSteps();
        createdAt = scenario.getCreatedAt();
        info= scenario.getInfo();
        testRunId= scenario.getTestRunId();
    }

    public String getId() {
        return id;
    }

    public ScenarioStatus getStatus() {
        return status;
    }

    public String getScenarioKey() {
        return scenarioKey;
    }

    public Set<String> getTags() {
        return tags;
    }

    public Set<String> getAllTags() {
        return allTags;
    }

    public List<Step> getSteps() {
        return steps;
    }

    public ZonedDateTime getCreatedAt() {
        return createdAt;
    }

    public BasicInfo getInfo() {
        return info;
    }

    public String getTestRunId() {
        return testRunId;
    }
}
