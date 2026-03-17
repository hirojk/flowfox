import { ProjectType } from '@flowfox/shared'
import ProjectModel from '../models/Project'

async function testSchema() {
  const Model = ProjectModel()

  const testProject = new Model({
    id: 12345,
    projectName: 'Test Project',
    creatorId: 56789,
    components: [
      {
        id: 12345,
        type: 'board',
        boardName: 'Test Board',
        creatorId: 56789,
        members: [56789, 98765],
        columns: [
          {
            id: 12345,
            columnName: 'To Do',
            cards: [
              {
                id: 12345,
                taskName: 'Test Task',
                priority: 'High',
                description: 'Test Description',
                checklist: [{ isChecked: false, label: 'Item 1' }],
                startDate: new Date(),
                deadline: new Date(),
                tags: [{ label: 'urgent', color: '#ff0000' }],
              },
            ],
          },
        ],
      },
    ],
  } satisfies Partial<ProjectType>)

  console.log('\n🧪 Test Document:')
  console.log(JSON.stringify(testProject.toObject(), null, 2))

  const validationError = testProject.validateSync()
  if (validationError) {
    console.error('❌ Validation Error:', validationError)
  } else {
    console.log('✅ Validation passed!')
  }
}

testSchema()
