package example.reporting.api.testrun;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Entity("testRuns")
public class TestRun {

    @Id
    private String id;

    private String env;

    private Date date;

    private Map<String, String> labels = new HashMap<>();

    private TestRunStatus status;

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public String getEnv() {
        return env;
    }

    public void setEnv(final String env) {
        this.env = env;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(final Date date) {
        this.date = date;
    }

    public Map<String, String> getLabels() {
        return labels;
    }

    public void setLabels(final Map<String, String> labels) {
        this.labels = labels;
    }

    public TestRunStatus getStatus() {
        return status;
    }

    public void setStatus(final TestRunStatus status) {
        this.status = status;
    }

}