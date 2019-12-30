package io.zucchiniui.backend.scenario.domain;

import io.zucchiniui.backend.shared.domain.BasicInfo;
import io.zucchiniui.backend.shared.domain.Location;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class BackgroundTest {

    @Test
    public void should_change_step_status_on_background_status_change() throws Exception {
        // given
        final Background background = createBackground();

        final StepStatus newStatus = StepStatus.PASSED;

        // when
        background.setStatus(newStatus);

        // then
        assertThat(background.getSteps()).extracting(Step::getStatus).containsOnly(newStatus);
    }

    @Test
    public void should_copy_background() throws Exception {
        // given
        final Background background = createBackground();

        // when
        final Background backgroundCopy = background.copy();

        // then
        assertThat(backgroundCopy).isNotSameAs(background);
        assertThat(backgroundCopy.getInfo()).isEqualTo(background.getInfo());
        assertThat(backgroundCopy.getSteps()).hasSameSizeAs(background.getSteps());

        for (int i = 0; i < backgroundCopy.getSteps().size(); i++) {
            final Step stepCopy = backgroundCopy.getSteps().get(i);
            final Step step = background.getSteps().get(i);

            assertThat(stepCopy).isNotSameAs(step);
            assertThat(stepCopy).isEqualToComparingFieldByField(step);
        }

    }

    private static Background createBackground() {
        return new BackgroundBuilder()
            .withInfo(new BasicInfo("Background", "test", new Location("filename", 1L)))
            .addStep(stepBuilder -> stepBuilder.withInfo(generateBasicInfo(1)).withStatus(StepStatus.PASSED))
            .addStep(stepBuilder -> stepBuilder.withInfo(generateBasicInfo(2)).withStatus(StepStatus.PASSED))
            .addStep(stepBuilder -> stepBuilder.withInfo(generateBasicInfo(3)).withStatus(StepStatus.FAILED).withErrorMessage("error"))
            .build();
    }

    private static BasicInfo generateBasicInfo(long stepNumber) {
        return new BasicInfo("Step", "step " + stepNumber, new Location("filename", stepNumber));
    }

}
