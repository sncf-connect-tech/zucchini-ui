package io.zucchiniui.backend.scenario.domain;

import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class ScenarioStatusTest {

    @Test
    public void should_return_scenario_with_status_pending() {
        assertThat(ScenarioStatus.getScenarioByStatus("pending"))
            .isEqualTo(ScenarioStatus.PENDING);
    }

    @Test
    public void should_return_null_with_status_passed() {
        assertThat(ScenarioStatus.getScenarioByStatus("passed")).isNull();
    }
}
