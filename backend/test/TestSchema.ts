import ProjectModel from '../models/Project'

async function testSchema() {
  const testProject = new ProjectModel({
    projectName: 'Test Project',
    creatorId: '698d2b2c14ce099f119bb56e',
    components: [
      {
        id: 1,
        columnName: 'To Do',
        cards: [
          {
            id: 1,
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
  })

  console.log('\n🧪 Test Document:')
  console.log(JSON.stringify(testProject.toObject(), null, 2))

  // Validiere
  const validationError = testProject.validateSync()
  if (validationError) {
    console.error('❌ Validation Error:', validationError)
  } else {
    console.log('✅ Validation passed!')
  }
}

testSchema()
