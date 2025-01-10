import { Template } from './types';

export const defaultTemplates: Template[] = [
  {
    id: 'bug',
    name: 'Bug',
    description: `## Bug Description
* Current Behavior:
* Expected Behavior:
* Steps to Reproduce:

## Additional Information
* Environment:
* Version:
* Screenshots (if applicable):`,
  },
  {
    id: 'task',
    name: 'Task',
    description: `## Task Description
* Objective:
* Deliverables:

## Acceptance Criteria
1.
2.
3.

## Dependencies
* None`,
  },
  {
    id: 'story',
    name: 'User Story',
    description: `## User Story
As a [type of user],
I want [an action],
So that [benefit/value]

## Acceptance Criteria
1.
2.
3.

## Technical Notes
*`,
  },
  {
    id: 'epic',
    name: 'Epic',
    description: `## Epic Overview
* Goal:
* Business Value:

## User Stories
1.
2.
3.

## Success Metrics
*`,
  },
  {
    id: 'feature',
    name: 'Feature',
    description: `## Feature Description
* Overview:
* Target Users:
* Business Value:

## Requirements
1.
2.
3.

## Technical Considerations
*

## Success Metrics
*`,
  },
];
