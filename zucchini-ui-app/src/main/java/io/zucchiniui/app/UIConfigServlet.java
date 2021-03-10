package io.zucchiniui.app;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.zucchiniui.backend.config.BackendConfiguration;
import org.eclipse.jetty.http.HttpStatus;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.core.MediaType;
import java.io.IOException;

public class UIConfigServlet extends HttpServlet {

    private final BackendConfiguration configuration;

    private final ObjectMapper objectMapper;

    public UIConfigServlet(
            BackendConfiguration configuration,
            ObjectMapper objectMapper
    ) {
        this.configuration = configuration;
        this.objectMapper = objectMapper;
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setStatus(HttpStatus.OK_200);
        resp.setContentType(MediaType.APPLICATION_JSON);

        final UIConfig uiConfig = new UIConfig();
        uiConfig.setCorrectionActionConfig(configuration.getCorrectionAction());
        uiConfig.setEncounteredProblems(configuration.getEncounteredProblem());
        uiConfig.setUseFeaturePresence(configuration.getUseFeaturePresence());

        resp.getOutputStream().print(objectMapper.writeValueAsString(uiConfig));
    }
}
