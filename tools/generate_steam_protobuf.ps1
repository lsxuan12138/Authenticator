$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$protobufDir = Join-Path $projectRoot 'entry\src\main\ets\services\protobuf'
$protoPath = Join-Path $protobufDir 'steam_auth.proto'
$jsPath = Join-Path $protobufDir 'steam_auth.js'
$declarationPath = Join-Path $protobufDir 'steam_auth.d.ts'
$postprocessorPath = Join-Path $PSScriptRoot 'postprocess_steam_protobuf.mjs'

$npxCommand = Get-Command 'npx.cmd' -ErrorAction SilentlyContinue
if ($null -eq $npxCommand) {
  $npxCommand = Get-Command 'npx' -ErrorAction SilentlyContinue
}
if ($null -eq $npxCommand) {
  throw 'npx was not found. Install Node.js or add its installation directory to PATH.'
}

$nodeCommand = Get-Command 'node.exe' -ErrorAction SilentlyContinue
if ($null -eq $nodeCommand) {
  $nodeCommand = Get-Command 'node' -ErrorAction SilentlyContinue
}
if ($null -eq $nodeCommand) {
  throw 'node was not found. Install Node.js or add its installation directory to PATH.'
}

$temporaryDir = Join-Path ([System.IO.Path]::GetTempPath()) ("authenticator-protobuf-" + [guid]::NewGuid())
$temporaryJs = Join-Path $temporaryDir 'steam_auth.js'
$temporaryDeclaration = Join-Path $temporaryDir 'steam_auth.d.ts'
New-Item -ItemType Directory -Path $temporaryDir | Out-Null

try {
  & $npxCommand.Source --yes --package protobufjs@7.2.4 --package protobufjs-cli@1.1.3 pbjs -t static-module -w es6 --force-long -o $temporaryJs $protoPath
  if ($LASTEXITCODE -ne 0) { throw "pbjs failed with exit code $LASTEXITCODE." }

  & $npxCommand.Source --yes --package protobufjs@7.2.4 --package protobufjs-cli@1.1.3 pbts -o $temporaryDeclaration $temporaryJs
  if ($LASTEXITCODE -ne 0) { throw "pbts failed with exit code $LASTEXITCODE." }

  & $nodeCommand.Source $postprocessorPath $protoPath $temporaryJs $temporaryDeclaration
  if ($LASTEXITCODE -ne 0) { throw "Protobuf post-processing failed with exit code $LASTEXITCODE." }

  Copy-Item -LiteralPath $temporaryJs -Destination $jsPath -Force
  Copy-Item -LiteralPath $temporaryDeclaration -Destination $declarationPath -Force
  Write-Host 'Steam protobuf files were generated successfully.'
}
finally {
  Remove-Item -LiteralPath $temporaryDir -Recurse -Force -ErrorAction SilentlyContinue
}
