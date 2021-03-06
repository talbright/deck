import { IComponentOptions, IController, module } from 'angular';
import { IExpectedArtifact } from 'core/domain';
import { ArtifactIconService } from './ArtifactIconService';
import { ArtifactsMode, ArtifactsModeService } from './ArtifactsModeService';

import './artifactSelector.less';

class ExpectedArtifactMultiSelectorCtrl implements IController {
  public command: any;
  public idsField: string;
  public label: string;
  public expectedArtifacts: IExpectedArtifact[];
  public helpFieldKey: string;
  public showIcons: boolean;
  public artifactsEnabled = ArtifactsModeService.artifactsMode !== ArtifactsMode.DISABLED;

  public iconPath(expected: IExpectedArtifact): string {
    const artifact = expected && (expected.matchArtifact || expected.defaultArtifact);
    if (artifact == null) {
      return '';
    }
    return ArtifactIconService.getPath(artifact.type);
  }
}

const expectedArtifactMultiSelectorComponent: IComponentOptions = {
  bindings: {
    command: '=',
    expectedArtifacts: '<',
    artifactLabel: '@',
    idsField: '@',
    helpFieldKey: '@',
    showIcons: '<',
  },
  controller: ExpectedArtifactMultiSelectorCtrl,
  controllerAs: 'ctrl',
  template: `
      <ng-form name="artifacts" ng-if="ctrl.artifactsEnabled">
        <stage-config-field label="{{ctrl.artifactLabel}}" help-key="{{ctrl.helpFieldKey}}">
          <ui-select multiple
                     ng-model="ctrl.command[ctrl.idsField]"
                     class="form-control input-sm expected-artifact-multi-selector">
            <ui-select-match>
              <img
                ng-if="ctrl.showIcons && ctrl.iconPath($item)"
                width="16"
                height="16"
                class="artifact-icon"
                ng-src="{{ ctrl.iconPath($item) }}" />
              {{ $item.displayName }}
            </ui-select-match>
            <ui-select-choices repeat="expected.id as expected in ctrl.expectedArtifacts">
              <img
                ng-if="ctrl.showIcons && ctrl.iconPath(expected)"
                width="16"
                height="16"
                class="artifact-icon"
                ng-src="{{ ctrl.iconPath(expected) }}" />
              <span>{{ expected.displayName }}</span>
            </ui-select-choices>
          </ui-select>
        </stage-config-field>
      </ng-form>
  `,
};

export const EXPECTED_ARTIFACT_MULTI_SELECTOR_COMPONENT = 'spinnaker.core.artifacts.expected.multiSelector';
module(EXPECTED_ARTIFACT_MULTI_SELECTOR_COMPONENT, []).component(
  'expectedArtifactMultiSelector',
  expectedArtifactMultiSelectorComponent,
);
